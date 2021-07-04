import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import './../css/App.css';
import Nav from './Nav';
import Footer from './Footer';
import Sidebar from './Sidebar';
import AlertInfo from './AlertInfo';
import DieuHuongURL from '../routers/DieuHuongURL';

class App extends Component {
  render(){
    return (
      <Router>
        <AlertInfo/>
        <Nav/>
        <Sidebar/>
        <DieuHuongURL/>
        <Footer/>
      </Router>
    );
  }
  
}

export default App;
