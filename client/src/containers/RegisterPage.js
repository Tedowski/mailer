import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../services/AuthService';


export default class RegisterPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            passConf: null,
            error: null,
            loading: true,
            isToken: false,
        };
    }

    async handleSubmit () {
        const { username, password, passConf } = this.state;
        // Check if password and confPass match (throw err)
        if (password !== passConf) {
            this.setState({
                error: 'Passwords do not match',
            });

            return;
        }
        // If match add @gmail.com to the username
        const user = {
            username,
            password,
        };

        // execute post method to register endpoint
        try {
            const response = (await AuthService.register(user)).data;

            const { token } = response;
            localStorage.setItem('mailerToken', token);
            this.setState({
                isToken: true,
            });
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    handleUsername (evt) {
        this.setState({
            username: evt.target.value,
        });
    }

    handlePassword (evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    handleConfirm (evt) {
        this.setState({
            passConf: evt.target.value,
        });
    }

    render () {
        const { error, isToken } = this.state;

        if (isToken) {
            return <Redirect to="/send" />;
        }

        return (
            <div className="wrapper">
                <div>{error}</div>
                <div className="form">
                    <div className="input-group">
                        <label htmlFor="username">Gmail username</label>
                        <input type="username" id="username" onChange={(evt) => this.handleUsername(evt)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(evt) => this.handlePassword(evt)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="passConf">Re-type Password</label>
                        <input type="password" id="passConf" onChange={(evt) => this.handleConfirm(evt)} />
                    </div>
                    <button onClick={() => this.handleSubmit()}>Send Mail</button>
                </div>
            </div>
        );
    }
}
