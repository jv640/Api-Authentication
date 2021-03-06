import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className = "navbar navbar-expand-lg navbar-dark bg-dark" style = {{ marginBottom: '30px'}}>
                    <Link className = "navbar-brand" to="/">Jatin Verma API Auth</Link>

                    <div className = "collapse navbar-collapse">
                        <ul className = "navbar-nav mr-auto">
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/dashboard">Dashboard</Link>
                            </li>
                        </ul>

                        <ul className = "nav navbar-nav ml-auto">
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/signup" >Sign Up</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/signin" >Sign In</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/signout" >Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
