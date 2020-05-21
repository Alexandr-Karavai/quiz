import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
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
                        <Input
                            label={'Email'}
                            type={'text'}
                        />
                        <Input
                            label={'Password'}
                            type={'text'}
                        />
                        <Button
                            type={'success'}
                            onClick={this.signUpHandler}
                        >
                            Sign Up
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.logInHandler}
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