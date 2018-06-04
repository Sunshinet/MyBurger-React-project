import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideBarfromMenu = () =>{
        this.setState({showSideDrawer:true})
    }

 render(){
    return (
    <React.Fragment>
        <Toolbar openSideBar = {this.openSideBarfromMenu} />
        <SideDrawer open ={this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler} />
        <main className = { classes.Content }>
             {this.props.children}
        </main>
    </React.Fragment>
);
} 
}

export default Layout;