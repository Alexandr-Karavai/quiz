import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Please enter a valid email address',
                valid: false,
                touched: false,
                validation : {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Please enter a valid password',
                valid: false,
                touched: false,
                validation : {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    validateControl(value, validationParam) {
        if (!validationParam) {
            return true;
        }

        let isValid = true;

        if (validationParam.required) {
            isValid = value.trim() !== '';
        }

        if (validationParam.email) {
            const mailFormat = /^\w+([+.-]?\w+)*@\w+([+.-]?\w+)*(\.\w{2,3})+$/;
            isValid = value.match(mailFormat) && isValid;
        }

        if (validationParam.minLength) {
            isValid = value.length >= validationParam.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] };

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({
            isFormValid, formControls
        })
    }

    signUpHandler = () => {
        console.log('1')
    }

    logInHandler = () => {
        console.log('2')
    }

    onSubmitHandler = e => {
        e.preventDefault();
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    <form onSubmit={this.onSubmitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type={'success'}
                            onClick={this.signUpHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign Up
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.logInHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Log In
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;