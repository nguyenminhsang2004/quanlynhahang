import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SidebarNav from './SidebarNav';

class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">TRANG QUẢN TRỊ</span>
                </Link>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
                        </div>
                        <div className="info ml-2">
                            <h4 className="text-white">Admin</h4>
                        </div>
                    </div>
                    <SidebarNav/>
                </div>
            </aside>

        );
    }
}

export default Sidebar;