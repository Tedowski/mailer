import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MailService from '../services/MailService';


export default class MailPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            from: 'tadeas.elective@gmail.com',
            to: '',
            subject: '',
            text: '',
            error: null,
            loading: true,
            response: null,
        };
    }

    componentDidUpdate () {
        const { loading } = this.state
        if (loading) {
            this.setState({
                loading: false,
            });
        }
    }

    async sendMail () {
        const { to, subject, text } = this.state;
        const { token } = this.props;
        if (to === '' || subject === '' || text === '') {
            this.setState({
                error: 'Missing fields',
            });
            return;
        }

        this.setState({
            error: null,
            response: null,
        });

        try {
            const mailPayload = {
                receiver: to,
                subject,
                text,
                token,
            };
            const response = (await MailService.sendMail(mailPayload)).data;

            console.log(response);
            this.setState({
                to: '',
                subject: '',
                text: '',
            });
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    handleAddressee (evt) {
        this.setState({
            to: evt.target.value,
        });
    }

    handleSubject (evt) {
        this.setState({
            subject: evt.target.value,
        });
    }

    handleText (evt) {
        this.setState({
            text: evt.target.value,
        });
    }

    render () {
        const { error, response, to, subject, text, loading } = this.state;
        const { token } = this.props;

        if (!token && !loading) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="wrapper">
                <div>{response || error}</div>
                <div className="form">
                    <div className="input-group">
                        <label htmlFor="addressee">Email to</label>
                        <input type="text" id="addressee" onChange={(evt) => this.handleAddressee(evt)} value={to} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" onChange={(evt) => this.handleSubject(evt)} value={subject} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="text">Message</label>
                        <textarea type="text" id="text" onChange={(evt) => this.handleText(evt)} value={text} />
                    </div>
                    <button onClick={() => this.sendMail()}>Send Mail</button>
                </div>
            </div>
        );
    }
}
