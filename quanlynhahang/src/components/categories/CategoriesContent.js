import React, { Component } from 'react';
import {connect} from 'react-redux';
import CategoryItem from './CategoryItem';
import Pagination from './Pagination';

class CategoriesContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            description:'',
            totalCount:0
        }
    }
    
    componentWillMount() {
        var count = Math.ceil(this.props.listCategories.length / this.props.maxPage);
        this.setState({totalCount:count});
    }

    countPage = (status) => {
        var count = Math.ceil(this.props.listCategories.length / this.props.maxPage);
        this.setState({totalCount:count});
        if(this.props.page > count){
            this.props.paginationSet(this.props.page - 1);
        }
        else{
            this.props.paginationSet(this.props.page);
        }
    }

    printListCategories = () => {
        if(this.props.listCategories.slice(this.props.start,this.props.end) !== null){
            return this.props.listCategories.slice(this.props.start,this.props.end).map((value,key) => {
                return (
                    <CategoryItem
                    key = {key}
                    id = {key + 1}
                    name = {value.name}
                    flag = {value.flag}
                    description = {value.description}
                    category = {value}
                    countPage = {() => this.countPage()}
                    />
                );
            });
        }
    }

    printButtonAddCategory = () => {
       if(!this.props.isFrom){
           return (
                <button onClick={()=>this.props.changeStatusForm()} className="btn btn-success float-right"><i class="fa fa-plus" aria-hidden="true"></i> Thêm mới</button>
           );
       }
    }

    isChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        });
    }

    submitCategory = () => {
        var category = {};
        if(this.props.isEdit === true){
            if(this.state.name.length === 0) {
                category.name = this.props.categoryEdit.name;
            }
            else{
                category.name = this.state.name;
            }
            if(this.state.description.length === 0) {
                category.description = this.props.categoryEdit.description;
            }
            else{
                category.description = this.state.description;
            }
            category.id = this.props.categoryEdit._id;
            this.props.editCategory(category);
            this.props.alertOn('Sửa thành công danh mục.','info');
            this.props.changeEditStatus();
            this.props.changeStatusForm();
        }
        else{
            category.name = this.state.name;
            category.description = this.state.description;
            this.props.addNewCategory(category);
            this.props.alertOn("Thêm mới thành công danh mục.",'success');
            this.countPage(1);
        }
        this.setState({
            name:'',
            description:'',
            id:''
        });
    }


    closeForm = () => {
        this.props.changeStatusForm();
        if(this.props.isEdit){
            this.props.changeEditStatus();
        }
        this.setState({
            name:'',
            description:'',
            id:''
        });
    }

    printFormCategory = () =>{
        if(this.props.isFrom){
            return (
                <div className="col-sm-5">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-center">{this.props.isEdit === true ? "Sửa danh mục" : "Thêm mới danh mục"}</h3>
                        </div>
                        <div className="card-body">
                            <form>                 
                                <div className="form-group">
                                    <label className="col-form-label">Tên danh mục</label>
                                    <input defaultValue={this.props.isEdit === true ? this.props.categoryEdit.name : ''} onChange = {(e) => this.isChange(e)} name="name" type="text" className="form-control" placeholder="Category name" />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Mô tả</label>
                                    <textarea defaultValue={this.props.isEdit === true ? this.props.categoryEdit.description : ''} onChange = {(e) => this.isChange(e)} name="description" type="text" className="form-control" placeholder="Category description" ></textarea>
                                </div>                             
                                <button type="reset" onClick={()=>this.submitCategory()} className="float-right btn btn-app bg-success btn-lg"><i class="fas fa-save"></i> Save</button>                               
                                <button onClick={()=>this.closeForm()} className="float-right btn btn-app bg-danger btn-lg"><i class="fas fa-window-close"></i> Close</button>
                            </form>  
                        </div>
                    </div>
                </div>
            );
        }
        
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content mt-2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title float-left">Danh sách danh mục</h3>
                                        {this.printButtonAddCategory()}
                                    </div>
                                    <Pagination totalCount = {this.state.totalCount}/>
                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{width: '5px'}}>STT</th>
                                                    <th style={{width: '170px'}}>Tên danh mục</th>
                                                    <th>Mô tả</th>
                                                    <th style={{width: '150px'}}>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.printListCategories()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {this.printFormCategory()}                            
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFrom: state.categoriesState.statusForm,
        listCategories:state.categoriesState.listCategories,
        alertStatus:state.categoriesState.alertStatus,       
        isEdit:state.categoriesState.isEdit,
        categoryEdit:state.categoriesState.categoryEdit,
        maxPage:state.categoriesState.maxPage,
        page:state.categoriesState.page,
        start:state.categoriesState.start,
        end:state.categoriesState.end,
        totalPage:state.categoriesState.totalPage
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStatusForm: () => {
            dispatch({type:'CHANGE_STATUS_FROM_CATEGORY'})
        },
        addNewCategory: (dataItem) => {
            dispatch({type:'ADD_NEW_CATEGORY',dataItem})
        },
        alertOn: (alertContent,alertType) => {
            dispatch({type:'ALERT_ON',alertContent,alertType})
        },
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_CATEGORY_STATUS'})
        },
        editCategory: (dataItem) => {
            dispatch({type:'EDIT_CATEGORY',dataItem})
        },
        paginationSet: (page) => {
            dispatch({type:'PAGINATION_CATEGORIES_SET',page})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoriesContent);