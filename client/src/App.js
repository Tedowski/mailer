import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

import MailPage from './containers/MailPage';

import MailService from './services/MailService';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message: 'Hello world',
            loading: true,
            error: null,
            user: {},
            email: {
                subject: '',
                to: '',
                body: '',
            },
            inbox: {},
            sent: [],
        };
    }

    componentDidMount () {
        Promise.all([this.getSent()])
            .then(() => {
                this.setState({
                    loading: false,
                });
            });
    }

    async getInbox () {
        this.setState({
            error: null,
            loading: true,
        });

        try {
            const inbox = (await MailService.getInbox()).data;

            this.setState({
                message: inbox.message,
            });

            const { message } = this.state;

            console.log(message);
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    async getSent () {
        this.setState({
            error: null,
            loading: true,
        });

        try {
            const sentMails = (await MailService.getSent()).data;

            this.setState({
                sent: sentMails,
            });

            const { sent } = this.state;

            console.log(sent);
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    render () {
        const { message } = this.state;

        return (
            <div className="App">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Route exact path="/">
                    <MailPage message={message} />
                </Route>
            </div>
        );
    }
}

export default App;
