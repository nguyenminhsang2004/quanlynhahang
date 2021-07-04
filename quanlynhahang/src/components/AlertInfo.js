import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import {connect} from 'react-redux';

class AlertInfo extends Component {

    handleDismiss = () => {
        this.props.alertOff();
    }

    render() {
        if(this.props.alertStatus === false) return null;
        return (
            <AlertContainer>
                <Alert onDismiss = {() => this.handleDismiss()} type={this.props.alertType} timeout={1000}>{this.props.alertContent}</Alert>
            </AlertContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alertStatus: state.categoriesState.alertStatus,
        alertContent: state.categoriesState.alertContent,
        alertType: state.categoriesState.alertType
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOff: () => {
            dispatch({type:'ALERT_OFF'})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AlertInfo)