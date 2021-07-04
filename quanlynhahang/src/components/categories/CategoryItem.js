import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../css/CategoryItem.css';

class CategoryItem extends Component {

    editCategory = () => {
        if(!this.props.isFrom){
            this.props.changeStatusForm();
        }
        this.props.changeEditStatus();
        this.props.getCategoryEdit(this.props.category);
    }

    deleteCategory = () => {
        this.props.deleteCategory(this.props.category);  
        this.props.countPage(0);      
        this.props.alertOn('Xóa danh mục thành công','danger');   
    }

    printCategoryItemAction = () => {
        if(!this.props.flag === true){
            return (
                <div className="btn btn-group">
                    <button onClick={() => this.editCategory()} className="btn btn-warning"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button onClick={() => this.deleteCategory()} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            );
        }
        else{
            return(
                <div className="btn btn-group">
                    <button onClick={() => this.editCategory()} className="btn btn-warning"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                </div>
            );
        }
    }

    render() { 
        return(           
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>
                    {this.printCategoryItemAction()}           
                </td>
            </tr>         
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listCategories:state.categoriesState.listCategories,
        isFrom: state.categoriesState.statusForm,
        isEdit: state.categoriesState.isEdit,
        categoryEdit:state.categoriesState.categoryEdit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStatusForm: () => {
            dispatch({type:'CHANGE_STATUS_FROM_CATEGORY'})
        },
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_CATEGORY_STATUS'})
        },
        getCategoryEdit: (editItem) => {
            dispatch({type:'GET_DATA_CATEGORY_EDIT',editItem})
        },
        deleteCategory: (dataItem) => {
            dispatch({type:'DELETE_CATEGORY',dataItem})
        },
        alertOn: (alertContent,alertType) => {
            dispatch({type:'ALERT_ON',alertContent,alertType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)