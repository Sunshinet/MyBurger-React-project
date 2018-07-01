import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/Checkout';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component{
    //    state = {
    //         ingredients:{
    //             salad:1,
    //             meat:1,
    //             cheese:1,
    //             bacon:1
    //         },
    //         price: 0
    //     }
    
  
    // componentDidMount() {
    //   const query = new URLSearchParams(this.props.location.search);
    //   console.log(query)
    //   const ingredients ={};
    //   let price = 0;
    //   //URLSearchParams.entires() -> Returns an iterator allowing to go through all key/value pairs contained in this object.
    //   for (let param of query.entries()){
    //       //['salad', '1']
    //       if(param[0] === 'price'){
    //           price =param[1]
    //       }else{
    //         ingredients[param[0]] = +param[1];
    //       }
           
    //   }
    //     this.setState({ingredients: ingredients, price: price});
      
      
    // }
    checkoutCancelledHandler =() => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler =() => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
               <CheckoutSummery 
               checkoutCancelled = {this.checkoutCancelledHandler}
               checkoutContinued = {this.checkoutContinuedHandler}
               ingredients = {this.props.ings}/>
               <Route  path = {this.props.match.path + '/contact-data'} component = { ContactData }/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
      
    }
};

export default connect(mapStateToProps)(Checkout);