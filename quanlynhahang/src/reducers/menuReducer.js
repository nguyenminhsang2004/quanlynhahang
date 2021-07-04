import { categoriesModel } from "../model/categoriesModel";
import { menuModel } from "../model/menuModel";

const maxPage = 8;

const menuInitialState = {
    categories:categoriesModel.getAllCategory(),
    listMenu:menuModel.getAllMenu(),
    isEdit:false,
    isForm:false,
    menuEdit:{},
    maxPage:maxPage,
    page:1,
    start:0,
    end:maxPage
}
const categoriesReducer = (state = menuInitialState, action) => {
    var temp = [];
    switch (action.type) {
        case "ADD_NEW_MENU":
            temp = state.listMenu;
            menuModel.insert(action.dataItem).then((res) => {   
                if(res.data !== 500){
                    action.dataItem._id = res.data;
                }
            });
            temp.push(action.dataItem);
            return {...state,listMenu:temp};
        case "CHANGE_EDIT_MENU_STATUS":
            return {...state,isEdit:!state.isEdit};
        case "CHANGE_FORM_MENU_STATUS":
            return {...state,isForm:!state.isForm};
        case "GET_DATA_MENU_EDIT":
            return {...state,menuEdit:action.editItem};
        case "EDIT_MENU":
            temp = state.listMenu;
            menuModel.update(action.dataItem).then((res) =>{
                if(res.status === 200){
                    temp.forEach(element => {
                        if(element._id === action.dataItem.id){
                            element.name = action.dataItem.name;
                            element.description = action.dataItem.description;
                            element.price = action.dataItem.price;
                            element.discount = action.dataItem.discount;
                            element.image = action.dataItem.image;
                            element.category_id = action.dataItem.category_id;
                            element.new = action.dataItem.new;
                        }
                    });
                }
            });
            return {...state,listMenu:temp};
        case "DELETE_MENU":
            var arr = [];
            arr = state.listMenu;
            menuModel.delete(action.dataItem._id);
            arr = arr.filter(item => item._id !== action.dataItem._id);
            return {...state,listMenu:arr};
        case "PAGINATION_MENU_SET":
            return {...state,page:action.page,start:(action.page - 1) * maxPage,end:action.page * maxPage};
        default:
            return state;
    }
}

export default categoriesReducer;