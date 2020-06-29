import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';

import CustomInput from './CustomInput'; 

class SignUp extends Component {

    onSubmit(formData) {
        console.log('OnSubmit got called');
        console.log('form Data', formData)
    }
    
    render() {
        const { handleSubmit } = this.props; 
        return (
            <div className = "row">
                <div className = "col"> 
                    <form onSubmit = {handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field 
                                name = "email"
                                type = "text"
                                id = "email"
                                label = "Enter your Email"
                                placeholder = "example@example.com"
                                component = { CustomInput } />
                        </fieldset>
                        <fieldset>
                            <Field 
                                name = "password"
                                type = "password"
                                id = "password"
                                label = "Enter your Password"
                                placeholder = "YourSuperPassword"
                                component = { CustomInput }/>
                        </fieldset>

                        <button type = "submit">Sign Up</button>
                    </form>
                </div>
                <div className = "col">
                    <div className = "text-center">
                        <div className = "alert alert-primary">
                            Or Sign Up using third party!!
                        </div>
                        <button className = "btn btn-default">Facebook</button>
                        <button className = "btn btn-default">Google</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({ form:'signup'})(SignUp)       