import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
       <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(el=> (
            <BuildControl key ={el.label} label = {el.label} 
            addIngredient = {() => props.ingredientAdded(el.type) } 
            removeIngred = {()=>props.ingredientRemoved(el.type)}
            disabled = {props.disabled[el.type]} /> 
        ))}
        <button className = {classes.OrderButton} 
        onClick = {props.ordered} 
        disabled = {!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;