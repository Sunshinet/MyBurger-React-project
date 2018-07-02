import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
       this.props.onInitIngredient();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

       return  sum > 0;
       // console.log(ingredients)
    }

    purchaseHandler = () => {
    this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+ this.state.totalPrice)
        // console.log(queryParams)
        // let queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: 'checkout',
        //     search: '?' + queryString
        // });
      this.props.history.push('/checkout');
      
    }
    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let burger = this.props.error ? <p>Ingredients can`t be loaded!</p> : <Spinner />
        let orderSummery;
        if (this.props.ings) { //we fetch the data and check if ingredients are not null 
            orderSummery = <OrderSummery price={this.props.price} 
            cancelOrder={this.purchaseCancelHandler} 
            continueOrder={this.purchaseContinueHandler} 
            ingredients={this.props.ings} />
            burger =  <Burger ingredients={this.props.ings} />
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
                <BuildControls
                ingredientAdded={this.props.onIngredientAdd}
                ingredientRemoved={this.props.onIngredientRemove}
                disabled={disableInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                price={this.props.price}
                ordered={this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch (burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch (burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));