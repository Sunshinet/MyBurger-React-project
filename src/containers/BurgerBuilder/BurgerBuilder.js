import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-370c6.firebaseio.com/ingredients.json')
            .then(response => {
                //console.log(response)
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({error:true})
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 })
       // console.log(ingredients)
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice)
        console.log(queryParams)
        let queryString = queryParams.join('&');
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        });
      
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let burger = this.state.error ? <p>Ingredients can`t be loaded!</p> : <Spinner />
        let orderSummery;
        if (this.state.ingredients) { //we fetch the data and check if ingredients are not null 
            orderSummery = <OrderSummery price={this.state.totalPrice} cancelOrder={this.purchaseCancelHandler} continueOrder={this.purchaseContinueHandler} ingredients={this.state.ingredients} />
            if (this.state.loading) {
                orderSummery = <Spinner />
            }
            burger =  <Burger ingredients={this.state.ingredients} />
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disableInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);