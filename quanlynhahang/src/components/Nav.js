import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <NavLink style={{color:'#1e272e',fontSize:'24px',padding:'0px',fontWeight:'bold'}} to="/" className="nav-link"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</NavLink>
                </li>
              </ul>             
          </nav>
        );
    }
}

export default Nav;