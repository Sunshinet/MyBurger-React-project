import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link ="/orders">Orders</NavigationItem>
        <div></div>
    </ul>

);

export default navigationItems;