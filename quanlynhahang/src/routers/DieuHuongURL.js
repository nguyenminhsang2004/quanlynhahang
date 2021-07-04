import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HomeContent from '../components/HomeContent';
import CategoriesContent from '../components/categories/CategoriesContent';
import MenuContent from '../components/menu/MenuContent';

class DieuHuongURL extends Component {
    render() {
        return (           
            <Switch>
                <Route exact path="/" component={HomeContent}/>
                <Route path="/danh-muc" component={CategoriesContent}/>
                <Route path="/thuc-don" component={MenuContent}/>
            </Switch>
        );
    }
}

export default DieuHuongURL;