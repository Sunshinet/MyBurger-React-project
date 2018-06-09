import React from 'react';
import Button from  '../../UI/Button/Button';

const orderSummery = (props) =>{
    const ingredientSummery = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key = {igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        );
    })
   return(
       <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p>TOTAL PRICE: {props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType ="Danger" clicked = {props.cancelOrder} >CANCEL</Button>
            <Button btnType ="Success" clicked = {props.continueOrder}>CONTINUE</Button>
        </React.Fragment>
   );
}

export default orderSummery;