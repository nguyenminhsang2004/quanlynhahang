import categoriesReducer from "../reducers/categoriesReducer";
import menuReducer from "../reducers/menuReducer";
import { categoriesModel } from "../model/categoriesModel";

var redux = require('redux');
var categoriesState = {
    statusForm:false,
    listCategories:categoriesModel.getAllCategory(),
    alertStatus:false,
    isEdit:false,
    categoryEdit:{}
}

var menuState = {
    categories:categoriesModel.getAllCategory()
}

const allReducer = redux.combineReducers({
    categoriesState:categoriesReducer,
    menuState:menuReducer
})

var store = redux.createStore(allReducer);
store.subscribe(() => {
    console.log(JSON.stringify(store.getState()));
})
export default store;

