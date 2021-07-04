import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer" style={{height:'66px'}}>
                    <strong>Copyright © 2014-2020 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.1.0-rc
                    </div>
                </footer>
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
            
        );
    }
}

export default Footer;