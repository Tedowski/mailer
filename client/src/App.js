import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MailService from "./services/MailService";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Hello world",
            loading: true,
            error: null
        }
    }

    async getInbox() {
        this.setState({
            error: null,
            loading: true
        });

        try {
            const inbox = (await MailService.getInbox()).data;

            this.setState({
                message: inbox.message
            });

            console.log(this.state.message);
        } catch (err) {
            this.setState({
                error: err.message
            });
        }
    }

    componentDidMount() {
        Promise.all([this.getInbox()])
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {

        const { message, error } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        { message }
                    </p>
                    <p>
                        { error && <div>{error}</div> }
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
