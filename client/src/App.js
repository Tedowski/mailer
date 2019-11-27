import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import MailPage from './containers/MailPage';
import RegisterPage from './containers/RegisterPage';
import SentPage from './containers/SentPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';

import Header from './components/Header';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            token: null,
            isUpdated: false,
        };
    }

    // TODO ******************
    // reset access token when it expires
    // keep token only in app state
    // check for expiration on update

    componentDidMount () {
        const mailerToken = sessionStorage.getItem('mailerToken');

        this.setState({
            isUpdated: true,
        });

        if (mailerToken) {
            this.setState({
                token: mailerToken,
            });
        }
    }

    saveToken = (token) => {
        this.setState({
            token,
        });
    };

    removeToken = () => {
        this.setState({
            token: null,
        })
    };

    render () {
        const { token } = this.state;

        return (
            <div className="App">
                <Header token={token} />
                <Route
                    exact path="/" render={() => {
                        return <Redirect to="/login" />
                    }}
                />
                <Route exact path="/register">
                    <RegisterPage token={token} tokenize={this.saveToken} />
                </Route>
                <Route exact path="/login">
                    <LoginPage token={token} tokenize={this.saveToken} />
                </Route>
                <Route exact path="/send">
                    <MailPage token={token} />
                </Route>
                <Route exact path="/sent">
                    <SentPage token={token} />
                </Route>
                <Route exact path="/logout">
                    <LogoutPage logout={this.removeToken} />
                </Route>
            </div>
        );
    }
}

export default App;
