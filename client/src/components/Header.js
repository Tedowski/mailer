import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Header extends Component {
    render () {
        const { token } = this.props;

        return (
            <div className="header shadow">
                <div className="container">
                    {token ? (
                        <div className="links">
                            <NavLink to="/send" className="link">Compose</NavLink>
                            <NavLink to="/sent" className="link">Sent</NavLink>
                            <NavLink to="/logout" className="link">Log out</NavLink>
                        </div>
                    ) : (
                        <div className="links">
                            <NavLink to="/register" className="link">Register</NavLink>
                            <NavLink to="/login" className="link">Login</NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}