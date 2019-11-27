import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FormItem from '../components/FormItem';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

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
        };
    }

    sendMail = async () => {
        const { to, subject, text } = this.state;
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
            const { token } = this.props;
            const mailPayload = {
                receiver: to,
                subject,
                text,
            };
            const response = (await MailService.sendMail(mailPayload, token)).data;

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
    };

    handleAddressee = (evt) => {
        this.setState({
            to: evt.target.value,
        });
    };

    handleSubject = (evt) => {
        this.setState({
            subject: evt.target.value,
        });
    };

    handleText = (evt) => {
        this.setState({
            text: evt.target.value,
        });
    };

    render () {
        const { error, to, subject, text } = this.state;
        const { token } = this.props;

        if (!token) {
            return <Redirect to="/login" />;
        }

        return (
            <section className="section">
                <div className="container">
                    <h1>Send Mail</h1>
                    <div className="form form-l shadow">
                        <div>{error}</div>
                        <FormItem name="addressee" label="Email to" value={to} type="text" method={this.handleAddressee} />
                        <FormItem name="subject" label="Subject" value={subject} type="text" method={this.handleSubject} />
                        <TextArea name="text" label="Message" value={text} method={this.handleText} />
                        <Button styling="btn-main" name="Send Mail" method={this.sendMail} />
                    </div>
                </div>
            </section>
        );
    }
}
