import { categoriesModel } from "../model/categoriesModel";
import { menuModel } from "../model/menuModel";

const maxPage = 5;// Tổng số bản ghi trên một trang

const categoriesInitialState = {
    statusForm:false,
    listCategories:categoriesModel.getAllCategory(),
    alertStatus:false,
    isEdit:false,
    categoryEdit:{},
    alertContent:'',
    alertType:'',
    maxPage:maxPage,
    page:1,
    start:0,
    end:maxPage
}
const categoriesReducer = (state = categoriesInitialState, action) => {
    var temp = [];
    switch (action.type) {
        case "CHANGE_STATUS_FROM_CATEGORY":
            return {...state,statusForm:!state.statusForm};
        case "ADD_NEW_CATEGORY":
            temp = state.listCategories;
            categoriesModel.insert(action.dataItem).then((res) => {   
                if(res.data !== 500){
                    action.dataItem._id = res.data;
                }
            });
            temp.push(action.dataItem);
            return {...state,listCategories:temp};
        case "EDIT_CATEGORY":
            categoriesModel.update(action.dataItem).then((res) =>{
                if(res.status === 200){
                    state.listCategories.forEach(element => {
                        if(element._id === action.dataItem.id){
                            element.name = action.dataItem.name;
                            element.description = action.dataItem.description;
                        }
                    });
                }
            });
            return state;
        case "DELETE_CATEGORY":
            var arr = [];
            arr = state.listCategories;
            menuModel.update_menu_category(action.dataItem._id).then(res => {
                if(res.status === 200){
                    categoriesModel.delete(action.dataItem._id);
                }
            });
            arr = arr.filter(item => item._id !== action.dataItem._id);
            return {...state,listCategories:arr};
        case "CHANGE_EDIT_CATEGORY_STATUS":
            return {...state,isEdit:!state.isEdit};  
        case "GET_DATA_CATEGORY_EDIT":
            return {...state,categoryEdit:action.editItem};
        case "ALERT_ON":
            return {...state,alertStatus:true,alertContent:action.alertContent,alertType:action.alertType};
        case "ALERT_OFF":
            return {...state,alertStatus:false};
        case "PAGINATION_CATEGORIES_SET":
            return {...state,page:action.page,start:(action.page - 1) * maxPage,end:action.page * maxPage};
        default:
            return state;
    }
}


export default categoriesReducer;