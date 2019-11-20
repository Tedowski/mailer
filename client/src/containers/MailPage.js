import React, { Component } from 'react';
import MailService from "../services/MailService";


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

    async sendMail () {
        const { from, to, subject, text } = this.state;
        if (to === '' || subject === '' || text === '') {
            this.setState({
                error: 'Missing fields',
            });
            return;
        }

        this.setState({
            error: null,
            loading: true,
            response: null,
        });

        try {
            const mail = {
                from,
                to,
                subject,
                text,
            };
            const response = (await MailService.sendMail(mail)).data;

            this.setState({
                response: response.message,
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
        const { message } = this.props;
        const { error, response, to, subject, text } = this.state;

        return (
            <div className="wrapper">
                <div>{response || error || message}</div>
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
