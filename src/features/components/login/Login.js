import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            username: '',
            password: '',
            auth: false
        };
    }

    render() {
        if (this.state.auth) {
            return (
                <div>
                    <Redirect to='/map' />
                </div>
            );
        }

        return (
            <div>
                <form onSubmit={ this.login } className="text-center">
           	        <input type="text" placeholder="Username" onChange={e => this.setState({ username: e.target.value})} 
                       className="no-morph"/>
                    <br/>
                        
                    <input type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value})} 
                      className="no-morph" />                
                    <br/>

	                <input type="submit" value="Login" />
                </form>
            </div>
        );
    }

    login() {
        this.setState({ auth: true });
    }

    changePassword() {
        console.log('Change Password!');
    }
}

export default Login;