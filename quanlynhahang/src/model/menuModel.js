import axios from "axios";

var Menu = {
    getAllMenu: () => {
        var arr = [];
        const menu = () => axios.get('/menu/get-all-menu').then((res) => res.data ,(err) => {console.log(err);});  
        menu().then(
            (res) => {res.forEach(element => {
                arr.push(element);
            });
        });
        return arr;
    },
    insert: async(item) => {
        try {
            return await axios.post('/menu/add-menu',{item});
        } catch (error) {
            console.log(error);
        }
        
    },
    update: async(item) => {
        try {
            return await axios.post('/menu/edit-menu',{item});
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            return await axios.post('/menu/delete-menu',{id});
        } catch (error) {
            console.log(error);
        }  
    },
    update_menu_category: async (id) => {
        try {
            return await axios.post('/menu/update_menu_category',{id});
        } catch (error) {
            console.log(error);
        } 
    }
}


export const menuModel = Menu;