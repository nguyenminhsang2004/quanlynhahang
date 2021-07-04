import React, { Component } from 'react';
import {connect} from 'react-redux';
import MenuForm from './MenuForm';
import MenuItem from './MenuItem';
import Pagination from './Pagination';

class MenuContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentWillMount() {
        var count = Math.ceil(this.props.listMenu.length / this.props.maxPage);
        this.setState({totalCount:count});
    }

    printMenuForm = () => {
        if(this.props.isForm){
            return <MenuForm/>;
        }
    }

    printListCategories = () => {
        if(this.props.categories !== null){
            return this.props.categories.map((value) => {
                return (
                    <option value={value._id}>{value.name}</option>
                );
            })
        }
    }

    printPagination = () => {
        if(this.props.isForm) return null;
        return <Pagination totalCount = {this.state.totalCount}/>;
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

    printFilter = () =>{
        if(!this.props.isForm){
            return (
                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-group">
                            <select name="category_id" onChange = {(e) => this.isChange(e)} className="custom-select form-control-border border-width-2" id="exampleSelectBorderWidth2">
                                {this.printListCategories()}
                            </select>  
                        </div>          
                    </div> 
                    <div className="col-sm-2">
                        <div className="input-group">
                            <select defaultValue ="Giá từ" name="" onChange = {(e) => this.isChange(e)} className="custom-select form-control-border border-width-2" id="exampleSelectBorderWidth2">
                                <option value = {0}>0</option>
                                <option value = {500000}>500000</option>
                                <option value = {1500000}>1500000</option>
                                <option value = {3000000}>3000000</option>
                                <option value = {5000000}>5000000</option>
                            </select>
                            <div className="input-group-append">
                                <span className="input-group-text">VND</span>
                            </div>
                        </div>
                    </div> 
                    <div className="col-sm-2">
                        <div className="input-group">
                            <select name="" onChange = {(e) => this.isChange(e)} className="custom-select form-control-border border-width-2" id="exampleSelectBorderWidth2">
                                <option value = {500000}>500000</option>
                                <option value = {1500000}>1500000</option>
                                <option value = {3000000}>3000000</option>
                                <option value = {5000000}>5000000</option>
                                <option value = {10000000}>10000000</option>
                                <option value = {10000001}>Trên 10000000</option>
                            </select>
                            <div className="input-group-append">
                                <span className="input-group-text">VND</span>
                            </div>
                        </div>
                    </div>   
                    <div className="col-sm-1">
                        <div style={{marginTop:'6px'}} class="custom-control custom-checkbox">
                          <input onChange = {(e) => this.isChangeCheckBox(e)} class="custom-control-input custom-control-input-danger" type="checkbox" id="customCheckbox4" name="new"/>
                          <label for="customCheckbox4" class="custom-control-label">New</label>
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <div style={{marginLeft:'-25px'}} className="form-group float-left">
                            <button className="btn btn-primary"><i class="fa fa-check" aria-hidden="true"></i></button>  
                        </div> 
                    </div> 
                    <div className="col-sm-3">
                        <button onClick={()=>this.props.changeMenuForm()} className="btn btn-success float-right"><i class="fa fa-plus" aria-hidden="true"></i> Thêm mới</button>
                    </div>  
                </div>  
            )
        }
    }

    printMenuItem = () => {
        console.log(this.props.listMenu.slice(this.props.start,this.props.end));
        if(this.props.isForm) return null;
        if(this.props.listMenu.slice(this.props.start,this.props.end) === null) return <h3 className = "text-center">Không có bản ghi</h3>
        return this.props.listMenu.slice(this.props.start,this.props.end).map((value, key) => {
            return (
                <MenuItem
                key = {key}
                id = {value._id}
                name = {value.name}
                description = {value.description}
                price = {value.price}
                image = {value.image}
                new = {value.new}
                discount = {value.discount}
                menu = {value}
                />
            );
        })     
    }
    
    render() {
        return (
            <div className="content-wrapper">
                <section className="content mt-2">
                    <div className="container-fluid">
                        {this.printFilter()}
                        {this.printPagination()}
                        <div className="row">
                            
                            {this.printMenuItem()}
                        </div>
                        {this.printMenuForm()}                  
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.menuState.categories,
        isForm:state.menuState.isForm,
        listMenu:state.menuState.listMenu,
        maxPage:state.menuState.maxPage,
        page:state.menuState.page,
        start:state.menuState.start,
        end:state.menuState.end
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeMenuForm: () => {
            dispatch({type:'CHANGE_FORM_MENU_STATUS'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent)
