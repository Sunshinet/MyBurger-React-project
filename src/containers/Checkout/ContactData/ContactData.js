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
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your e-mail'
                    },
                    value: ''
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

    orderHandler = (event) => {
          event.preventDefault()
          console.log(this.props.ingredients);
            this.setState({ loading: true });
        let data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
       
        }
     
          axios.post('orders.json', data)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => { this.setState({ loading: false }) })
    }

        inputChangedHandler = (event, inputIdentifier) => {
           const deepCloneState = JSON.parse(JSON.stringify(this.state.orderForm));
           let updatedEl = deepCloneState[inputIdentifier];
           updatedEl.value = event.target.value;
           this.setState({orderForm: deepCloneState});

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
            <form>
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