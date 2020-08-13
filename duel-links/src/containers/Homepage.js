import React, { Component } from 'react';

import './Homepage.css';
import Logo from '../components/Logo/Logo';

class Homepage extends Component {
    render () {
        return (
            <div className="Homepage">
                <h1>Welcolme to the Duel Links Academy!</h1>
                <p>dummy content</p>
                <Logo />
                <p>more bottonm content</p>
            </div>
        );
    }
}

export default Homepage;