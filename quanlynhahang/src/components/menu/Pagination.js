import React, { Component } from 'react';
import {connect} from 'react-redux';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MaxPage:5// Số trang lớn nhất được hiện ra
        }
    }

    handlePageClick = (page) => {
        if(page !== this.props.page){
            this.props.paginationSet(page);
        }
    }

    printPagination = () => {
        var startPage = Math.max(1,this.props.page - this.state.MaxPage / 2 );
        var endPage = Math.min(this.props.totalCount, this.props.page + this.state.MaxPage / 2);

        var listPage = [];
        for (let i = Math.ceil(startPage) ; i <= endPage; i++) {
            listPage.push(i);          
        }

        if(listPage !== null){
            return listPage.map((value,key) =>{
                return (
                    <li onClick = {() => this.handlePageClick(value)} className= {this.props.page === value ? 'page-item active' : 'page-item'} >
                        <a className="page-link">{value}</a>
                    </li>
                );
            });
        }
        
    }

    printPrev = () => {
        if(this.props.page > 1){
            return (
                <li onClick = {() => this.handlePageClick(this.props.page - 1)} className= 'page-item' >
                    <a className = "page-link"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
                </li>
            );
        }
    }

    printNext = () => {
        if(this.props.page < this.props.totalCount){
            return (
                <li onClick = {() => this.handlePageClick(this.props.page + 1)} className= 'page-item' >
                    <a className ="page-link"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </li>
            );
        }
    }

    printFirst = () => {
        if(this.props.page > 1){
            return (
                <li onClick = {() => this.handlePageClick(1)} className= 'page-item' >
                    <a className = "page-link"><i class="fa fa-step-backward" aria-hidden="true"></i></a>
                </li>
            );
        }
    }

    printLast = () => {
        if(this.props.page < this.props.totalCount){
            return (
                <li onClick = {() => this.handlePageClick(this.props.totalCount)} className= 'page-item' >
                    <a className ="page-link"><i class="fa fa-step-forward" aria-hidden="true"></i></a>
                </li>
            );
        }
    }

    render() {
        return (
            <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                    {this.printFirst()}
                    {this.printPrev()}
                    {this.printPagination()}
                    {this.printNext()}
                    {this.printLast()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        page:state.menuState.page,
        maxPage:state.menuState.maxPage
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        paginationSet: (page) => {
            dispatch({type:'PAGINATION_MENU_SET',page})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);