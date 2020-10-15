import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Input from '../myforms/Input';
import axios from '../axios-data';

class ContactData extends Component {
    state = {
        orderForm: {
            Email_Id: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email_Id'
                },
                value: ''
                  
            },
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: ''
                  
            },
            Address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: ''
                     
            },
            PhoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value: ''
                        
            },
            
        },
     
    }


    submitHandler = ( event ) => {
        event.preventDefault();
        alert("Submitted Sucessfully " );
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const addedData = {
            
            addeddata: formData
        }
    
         axios.post( '/Logindetails.json', addedData  )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
        
    }


   

    inputChangedHandler = (event, inputIdentifier) => {
    
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        /*updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)*/
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                 
      <button type='submit'> Submit</button>
              
            </form>
        );
    
        return (
            <div className={classes.ContactData}>
                <h5>Enter your Detalis</h5>
                {form}
            </div>
        );
    }
}

export default ContactData;