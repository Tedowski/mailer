import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import MailPage from './containers/MailPage';
import RegisterPage from './containers/RegisterPage';
import SentPage from './containers/SentPage';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message: 'Hello world',
            loading: true,
            error: null,
            token: null,
        };
    }

    // TODO ******************
    // reset access token when it expires
    // keep token only in app state
    // check for expiration on update

    componentDidMount () {
        const mailerToken = localStorage.getItem('mailerToken');

        if (mailerToken) {
            this.setState({
                token: mailerToken,
            });
        }
    }

    render () {
        const { message, token } = this.state;

        return (
            <div className="App">
                <Route
                    exact path="/" render={() => {
                        if (token === null) {
                            return <Redirect to="/register" />;
                        }
                        return <MailPage />;
                    }}
                />
                <Route exact path="/register">
                    <RegisterPage message={message} />
                </Route>
                <Route exact path="/send">
                    <MailPage token={token} />
                </Route>
                <Route exact path="/sent">
                    <SentPage token={token} />
                </Route>
            </div>
        );
    }
}

export default App;
