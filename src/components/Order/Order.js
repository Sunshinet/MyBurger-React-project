import React from 'react';
import classes from './Order.css'
const order = (props) => {
    console.log(props.ingredients)
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({ name: ingredientName, amaunt:props.ingredients[ingredientName]});
    }
    const ingredietOutput = ingredients.map(ig => {
        return <span>{ig.name} ({ig.amaunt})</span>
    })
    return (
        <div className = {classes.Order}>
            <p>Ingredients: {ingredietOutput}</p>
            <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
            <p>Customer: {props.name}</p>
        </div>
    );
};
export default order;