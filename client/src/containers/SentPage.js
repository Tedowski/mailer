import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MailItem from '../components/MailItem';

import MailService from '../services/MailService';


export default class MailPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: null,
            sent: [],
        };
    }

    componentDidMount () {
        this.getSent();
    }

    async getSent () {
        this.setState({
            error: null,
        });

        try {
            const { token } = this.props;
            const sentMails = (await MailService.getSent(token)).data;

            this.setState({
                sent: sentMails,
            });
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    render () {
        const { sent, error } = this.state;
        const { token } = this.props;

        if (!token) {
            return <Redirect to="/login" />;
        }

        return (
            <section className="section">
                <div className="container">
                    <h1>Sent mails</h1>
                    <div>{ error }</div>
                    {sent.length ? (
                        sent.map((mail, index) => (
                            <MailItem mail={mail} key={index} />
                        ))
                    ) : (
                        <div>No mails to be displayed</div>
                    )}
                </div>
            </section>
        );
    }
}
