import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideBarfromMenu = () =>{
     
        this.setState((prevSate) => {
            return {showSideDrawer: !prevSate.showSideDrawer} ;
        });
    }

 render(){
    return (
    <React.Fragment>
        <Toolbar drawerToggleClicked = {this.openSideBarfromMenu} />
        <SideDrawer open ={this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler} />
        <main className = { classes.Content }>
             {this.props.children}
        </main>
    </React.Fragment>
);
} 
}

export default Layout;