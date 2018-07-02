import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '', 
                    validation: {
                        required: true
                    }, 
                    valid: false,
                    touched:false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched:false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched:false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched:false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your e-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched:false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', DisplayValue: 'Fastest'},
                            {value: 'cheapest ', DisplayValue: 'Cheapest'}
                        ],
                        placeholder: 'Delivery Method'
                    },
                    value: 'fastest',
                    valid: true,
                }
            },
        formIsValid:false
      
    }; 

        checkValidity(value, rules){
           let isValid = true;
            if(!rules) {
                return true;
            }
            if(rules.required) {
                isValid = value.trim() !== '' && isValid; 
            }
            if(rules.length){
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }
            return isValid
        }
    orderHandler = (event) => {
          event.preventDefault()
            const formData = {};
            for (let el in this.state.orderForm){
                formData[el] = this.state.orderForm[el].value
            }
        const data = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData :  formData
        }
        this.props.onOrderBurger(data);
    }

        inputChangedHandler = (event, inputIdentifier) => {

            const updatedOrderForm = {
                ...this.state.orderForm
            };
            const updatedFormElement = { 
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            let formIsValid = true;
            for(let inputIdentifier in updatedOrderForm){
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

        }
    render(){
        const formElementArr = [];
        for (let key in this.state.orderForm){
            formElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
        <form onSubmit = {this.orderHandler}>
            {formElementArr.map(formEl => (
                <Input key= {formEl.id} elementType = {formEl.config.elementType}
                elementConfig = {formEl.config.elementConfig} 
                value = {formEl.config.value}
                changed = {(event) => this.inputChangedHandler(event, formEl.id)}
                shouldValidate = {formEl.config.validation}
                touched = {formEl.config.touched}
                invalid = {!formEl.config.valid}
                />
            ))}
            <Button btnType = "Success" disabled = {!this.state.formIsValid} clicked = {this.orderHandler}>Order</Button>
        </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
              {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
}
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
   
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ContactData,axios));