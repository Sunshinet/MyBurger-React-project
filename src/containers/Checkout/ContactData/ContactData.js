import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
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
                    valid: false
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
                    valid: false
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
                    valid: false
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
                    valid: false
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
                    valid: false
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
                    value: ''
                }
            },
        loading: false
    }; 

        checkValidity(value, rules){
           let isValid = true;

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
            this.setState({ loading: true });
            const formData = {};
            for (let el in this.state.orderForm){
                formData[el] = this.state.orderForm[el].value
            }
        let data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData :  formData
        }
     
          axios.post('orders.json', data)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => { this.setState({ loading: false }) })
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
            // updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            
        //     let formIsValid = true;
        //     for (let inputIdentifier in updatedOrderForm) {
        //         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        //     }
        console.log(updatedOrderForm)
            this.setState({orderForm: updatedOrderForm});
        // }
        //    const deepCloneState = JSON.parse(JSON.stringify(this.state.orderForm));
        //    let updatedEl = deepCloneState[inputIdentifier];
        //    updatedEl.value = event.target.value;
        //    console.log(typeof updatedEl.value)
        //    updatedEl.valid = this.checkValidity(updatedEl.valid,updatedEl.validation )
        //   console.log(updatedEl)
        //    this.setState({orderForm: deepCloneState});

        //    const updatedElement = { 
        //       ...cloneState[inputIdentifier]
        //     }
        //     updatedElement.value = event.target.value;
        //     cloneState[inputIdentifier] = updatedElement;
        //     this.setState({orderForm: cloneState});
            
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
                />
            ))}
            <Button btnType = "Success" clicked = {this.orderHandler}>Order</Button>
        </form>
        );
        if(this.state.loading){
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

export default ContactData;