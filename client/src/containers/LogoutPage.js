import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    componentDidMount () {
        const { logout } = this.props;
        sessionStorage.clear();
        logout();
    }

    render () {
        return (
            <Redirect to="/" />
        );
    }
}
