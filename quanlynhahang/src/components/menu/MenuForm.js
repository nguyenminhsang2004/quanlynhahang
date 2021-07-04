import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName:'Bạn chưa chọn ảnh',
            new:false,
            imageLink:null,
            image:null
        }
    }

    componentWillMount() {
        if(this.props.isEdit){
            if(this.props.menuEdit.image === "http://placehold.it/480x360"){
                this.setState({
                    imageLink:this.props.menuEdit.image,
                    imageName:"Ảnh mặc định"
                });
            }
            else{
                this.setState({
                    imageLink:'./..' + this.props.menuEdit.image.slice(23),
                    imageName:this.props.menuEdit.image.slice(this.props.menuEdit.image.lastIndexOf("-") + 1)
                });
            }
            this.setState({
                new:this.props.menuEdit.new,
                name:this.props.menuEdit.name,
                description:this.props.menuEdit.description,
                price:this.props.menuEdit.price,
                discount:this.props.menuEdit.discount,
                imageOld:this.props.menuEdit.image,
                category_id:this.props.menuEdit.category_id,
                id:this.props.menuEdit._id
            });
        }
    }
    
    printImage = () => {
        if(this.state.imageLink !== null){
            return <img className="card-img-top img-fluid" src = {this.state.imageLink} alt=""/> ;
        }
        else{
            return <h4 class="alert alert-warning" role="alert">Không có ảnh</h4>;
        }
    }

    isChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        });
    }

    isChangeCheckBox = (e) => {
        const name = e.target.name;
        const value = e.target.checked;
        this.setState({
            [name]:value
        });
    }

    isChangeImage = async(e) => {
        const name = e.target.name;
        const value = e.target.files[0];
        this.setState({
            [name]:value,
            imageName:value.name
        });

        const formData = new FormData();
        formData.append('image',value);
        try {
            const res = await axios.post('/menu/file-image',formData);
            this.setState({imageLink:'./..' + res.data.filePath.slice(23)});
        } catch (error) {
            console.log(error);
        }
    }

    printListCategories = () => {
        if(this.props.categories !== null){
            return this.props.categories.map((value) => {
                return (
                    <option selected = {this.props.isEdit === true ? this.props.menuEdit.category_id === value._id ? true : false : false} value={value._id}>{value.name}</option>
                );
            })
        }
    } 

    printNew = () => {
        if(this.state.new === true){
            return (
                <label className="col-form-label btn btn-outline-danger btn-lg">
                    <input onChange = {(e) => this.isChangeCheckBox(e)} type="checkbox" name="new" checked /> Món mới         
                </label>
                
            );
        }
        else{
            return (
                <label className="col-form-label btn btn-outline-danger btn-lg">
                    <input onChange = {(e) => this.isChangeCheckBox(e)} type="checkbox" name="new"/> Món mới         
                </label> 
            );
        }
    }
    submitForm = async () => {
        var menu = {};
        menu.name = this.state.name;
        menu.description = this.state.description;
        menu.price = this.state.price;
        menu.discount = this.state.discount;
        menu.new = this.state.new;
        menu.category_id = this.state.category_id;
        if(this.props.isEdit){
            if(this.state.image === null){
                menu.image = this.state.imageOld;
            }
            else{
                if(this.state.image !== null){
                    const formData = new FormData();
                    formData.append('image',this.state.image);
                    try {
                        const res = await axios.post('/menu/file-image',formData);
                        menu.image = res.data.filePath;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            menu.id = this.state.id;
            this.props.editMenu(menu);
            this.props.alertOn('Sửa món ăn thành công','info');
            this.closeForm();
        }
        else {
            if(this.state.image !== null){
                const formData = new FormData();
                formData.append('image',this.state.image);
                try {
                    const res = await axios.post('/menu/file-image',formData);
                    menu.image = res.data.filePath;
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                menu.image = "http://placehold.it/480x360";
            }
            this.props.addNewMenu(menu);
            this.props.alertOn('Thêm mới món ăn thành công','success');
        }
        
        this.setState({imageName:'Bạn chưa chọn ảnh'});
    }

    closeForm = () => {
        this.props.changeMenuForm();
        if(this.props.isEdit){
            this.props.changeEditStatus();
        }
        this.setState({
            imageLink:null
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-center">{!this.props.isEdit === true ? 'Thêm mới món ăn' : 'Sửa món ăn'}</h3>
                        </div>
                        <div className="card-body">
                            <form enctype="multipart/form-data">                 
                                <div className="form-group">
                                    <label className="col-form-label">Tên món ăn</label>
                                    <input defaultValue = {this.props.isEdit === true ? this.props.menuEdit.name : ''} onChange = {(e) => this.isChange(e)} name="name" type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Mô tả</label>
                                    <textarea defaultValue = {this.props.isEdit === true ? this.props.menuEdit.description : ''} rows={5} onChange = {(e) => this.isChange(e)} name="description" type="text" className="form-control" placeholder="Description" ></textarea>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label className="col-form-label">Danh mục</label>
                                            <select name="category_id" onChange = {(e) => this.isChange(e)} className="custom-select form-control-border border-width-2" id="exampleSelectBorderWidth2">
                                                {this.printListCategories()}
                                            </select>    
                                        </div>
                                        <div className="col-sm-3">
                                            <OverlayTrigger
                                                placement="bottom"
                                                trigger="click"
                                                overlay={(
                                                    <Popover>
                                                        <Popover.Content>
                                                            {this.printImage()}
                                                        </Popover.Content>
                                                    </Popover>
                                                )}>
                                                <label className="col-form-label">Ảnh món ăn (Click để xem ảnh)</label>
                                            </OverlayTrigger>
                                            
                                            <div className="custom-file">
                                                <input onChange = {(e) => this.isChangeImage(e)} name="image" type="file" className="custom-file-input form-control" id="customFile"/>
                                                <label className="custom-file-label" for="customFile">{this.state.imageName}</label>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <label className="col-form-label">Giá</label>
                                            <div className="input-group">
                                                <input defaultValue = {this.props.isEdit === true ? this.props.menuEdit.price : ''} onChange = {(e) => this.isChange(e)} name="price" type="number" className="form-control" placeholder="Price"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">VND</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="col-sm-3">
                                            <label className="col-form-label">Giảm giá</label>
                                            <div className="input-group">
                                                <input defaultValue = {this.props.isEdit === true ? this.props.menuEdit.discount : ''} onChange = {(e) => this.isChange(e)} name="discount" type="number" className="form-control" placeholder="Discount"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                <div className="form-group">{this.printNew()}
                                      
                                </div>                       
                                <button type="reset" onClick={()=>this.submitForm()} className="float-right btn btn-app bg-success btn-lg"><i class="fas fa-save"></i> Save</button>                               
                                <button onClick={()=>this.closeForm()} className="float-right btn btn-app bg-danger btn-lg"><i class="fas fa-window-close"></i> Close</button>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.menuState.categories,
        isEdit:state.menuState.isEdit,
        menuEdit:state.menuState.menuEdit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewMenu: (dataItem) => {
            dispatch({type:'ADD_NEW_MENU',dataItem})
        },
        alertOn: (alertContent,alertType) => {
            dispatch({type:'ALERT_ON',alertContent,alertType})
        },
        changeMenuForm: () => {
            dispatch({type:'CHANGE_FORM_MENU_STATUS'})
        },
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_MENU_STATUS'})
        },
        editMenu: (dataItem) => {
            dispatch({type:'EDIT_MENU',dataItem})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuForm)
