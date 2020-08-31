import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Homepage.css';
import Logo from '../components/Logo/Logo';

class Homepage extends Component {
    render () {
        return (
            <div className="Homepage">
                <div>
                    <h1>Welcolme to the Duel Links Academy!</h1>
                    <p>A fansite for the popular mobile game, no affiliation with konami</p>
                    <Logo />
                </div>
                <div>
                    <h1>Additional Duel Links Content Creators on Youtube:</h1>
                    <ul>
                        <li><a href="https://www.youtube.com/channel/UCz_cNcJzCy4asffzW5ERH1w">Duel Links Meta</a></li>
                        <li><a href="https://www.youtube.com/channel/UCXgNU9GtLPiE2dAYDwIQO6Q">YTDan Duel Links</a></li>
                        <li><a href="https://www.youtube.com/channel/UCGmqsD0yv9B3GGlhGcP5_xA">Playmaker Duel Links</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Homepage;