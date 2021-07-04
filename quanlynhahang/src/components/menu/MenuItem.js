import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {connect} from 'react-redux';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    printImage = () => {
        if(this.props.image === "http://placehold.it/480x360"){
            return <img className="card-img-top img-fluid" src="http://placehold.it/480x360" alt=""/>
        }
        else{
            return <img className="card-img-top img-fluid" src={'./../images/menu/' + this.props.image.slice(36)} alt=""/>
        }
    }
    

    editMenu = () => {
        this.props.getMenuEdit(this.props.menu);
        this.props.changeEditStatus();
        this.props.changeMenuForm();
    }
    
    deleteMenu = () => {
        this.props.deleteMenu(this.props.menu);
        this.props.alertOn('Xóa món ăn thành công','danger');
    }

    render() {
        return (
            <div className="col-sm-3 mb-2">
                <div className="card">
                    <OverlayTrigger
                        placement="bottom"
                        trigger="click"
                        overlay={(
                            <Popover>
                                <Popover.Title as="h2">
                                    <div className="text-center"><b>{this.props.name}</b></div>
                                    <div className="text-center"><i>{this.props.price}</i> VND</div>
                                    <div className="text-center">{this.props.new === true ? "Món mới - " : ""} Discount: {this.props.discount === 0 || null ? "0" : this.props.discount}%</div>
                                </Popover.Title>
                                <Popover.Content>
                                    <p className="text-center">{this.props.description}</p> 
                                </Popover.Content>
                            </Popover>
                        )}>
                        {this.printImage()}
                        </OverlayTrigger>
                    <small>Click vào ảnh để xem chi tiết</small>
                    <div className="btn-group">
                        <button onClick = {() => this.editMenu()} type="button" className="btn btn-warning"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        <button onClick = {() => this.deleteMenu()} type="button" className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        menuEdit: state.menuState.menuEdit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_MENU_STATUS'})
        },
        changeMenuForm: () => {
            dispatch({type:'CHANGE_FORM_MENU_STATUS'})
        },
        getMenuEdit: (editItem) => {
            dispatch({type:'GET_DATA_MENU_EDIT',editItem})
        },
        deleteMenu: (dataItem) => {
            dispatch({type:'DELETE_MENU',dataItem})
        },
        alertOn: (alertContent,alertType) => {
            dispatch({type:'ALERT_ON',alertContent,alertType})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)