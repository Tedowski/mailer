import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MailService from '../services/MailService';


export default class MailPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            sent: [],
        };
    }

    componentDidMount () {
        this.getSent();
    }

    componentDidUpdate () {
        const { loading } = this.state;
        if (loading) {
            this.setState({
                loading: false,
            });
        }

        // TODO **************
        // use different state than 'loading' to determine redirect
    }

    async getSent () {
        this.setState({
            error: null,
        });

        try {
            const { token } = this.props;
            const sentMails = (await MailService.getSent()).data;

            // TODO *********************

            // pass user access token as param

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
        const { loading, sent } = this.state;
        const { token } = this.props;

        if (!token && !loading) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="wrapper">
                <h1>Sent mails</h1>
            </div>
        );
    }
}
