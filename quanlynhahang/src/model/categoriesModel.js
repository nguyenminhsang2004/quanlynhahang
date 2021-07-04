import axios from "axios";

var Category = {
    getAllCategory: () => {
        var arr = [];
        const categories = () => axios.get('/categories/get-all-categories').then((res) => res.data ,(err) => {console.log(err);});  
        categories().then(
            (res) => {res.forEach(element => {
                arr.push(element);
            });
        });
        return arr;
    },
    insert: async(item) => {
        try {
            return await axios.post('/categories/add-category',{item});
        } catch (error) {
            console.log(error);
        }
        
    },
    update: async(item) => {
        try {
            return await axios.post('/categories/edit-category',{item});
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            return await axios.post('/categories/delete-category',{id});
        } catch (error) {
            console.log(error);
        }  
    }
}


export const categoriesModel = Category;