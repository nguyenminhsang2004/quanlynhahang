import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class SidebarNav extends Component {
    render() {
        return (
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item">
                        <a className="nav-link">
                            <i className="nav-icon fas fa-copy" />
                            <p>
                                Giao diện
                                <i className="fas fa-angle-left right" />
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <NavLink to="/header-menu" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>Header menu</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/header-slide-images" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>Slide ảnh</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/footer" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>Footer</p>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/danh-muc" className="nav-link">
                            <i className="nav-icon fa fa-book" />
                            <p>Danh mục</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/thuc-don" className="nav-link">
                            <i className="nav-icon fa fa-glass" />
                            <p>Thực đơn</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dat-ban" className="nav-link">
                            <i className="nav-icon fa fa-cart-plus" />
                            <p>Đặt bàn</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/nguoi-dung" className="nav-link">
                        <i className="nav-icon fa fa-users" />
                            <p>Người dùng</p>
                        </NavLink>           
                    </li>
                    <li className="nav-header">Doanh thu và doanh số</li>
                    <li className="nav-item">
                        <NavLink to="/doanh-thu" className="nav-link">
                            <i className="nav-icon fa fa-shopping-cart" />
                            <p>Doanh thu </p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/doanh-so" className="nav-link">
                            <i className="nav-icon fa fa-shopping-basket" />
                            <p>Doanh số</p>
                        </NavLink>
                    </li> 
                    <li className="nav-header">Phản hồi</li>
                    <li className="nav-item">
                        <NavLink to="/phan-hoi" className="nav-link">
                            <i className="nav-icon fa fa-comment" />
                            <p>Phản hồi </p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default SidebarNav;