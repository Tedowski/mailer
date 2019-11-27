import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FormItem from '../components/FormItem';
import Button from '../components/Button';

import AuthService from '../services/AuthService';


export default class RegisterPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: null,
        };
    }

    handleSubmit = async () => {
        const { username, password } = this.state;
        const user = {
            username,
            password,
        };

        // execute post method to register endpoint
        try {
            const response = (await AuthService.login(user)).data;

            const { token } = response;
            sessionStorage.setItem('mailerToken', token);
            this.props.tokenize(token);
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    };

    handleUsername = (evt) => {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassword = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    };

    render () {
        const { error } = this.state;
        const { token } = this.props;

        if (token) {
            return <Redirect to="/send" />;
        }

        return (
            <section className="section">
                <div className="container">
                    <h1>Login</h1>
                    <div className="form form-m shadow">
                        <div>{error}</div>
                        <FormItem name="username" label="Username" type="text" method={this.handleUsername} />
                        <FormItem name="password" label="Password" type="password" method={this.handlePassword} />
                        <Button styling="btn-main" name="Login" method={this.handleSubmit} />
                    </div>
                </div>
            </section>
        );
    }
}
