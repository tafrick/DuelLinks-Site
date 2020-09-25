import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Homepage.css';
import Logo from '../components/Logo/Logo';

import { makeStyles } from "@material-ui/core/styles";
import '../components/DeckTypes/Table.css';

import TournamentPic from '../assets/images/tournaments.png';
import TopTierPic from '../assets/images/top-tier-dekcs.png';
import BeginnersPic from '../assets/images/beginners-guide.png';
import KCPic from '../assets/images/kc-cup-things.png';

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div>
                    <h1 className="animate__animated animate__fadeIn animate__slower">Welcome to the Duel Links Academy!</h1>
                    <p className="animate__animated animate__fadeInLeftBig animate__slow">A fansite for the popular mobile game, no affiliation with Konami</p>
                    <Logo />
                    <ul className="articles">
                        <li>
                            <div className="guide">
                                <Link to="/beginners"><img src={BeginnersPic} alt="beginners guide" /></Link>
                                <div className="container">
                                    <h4><b>Beginner's Guide</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/KC_Cup"><img src={KCPic} alt="KC" /></Link>
                                <div className="container">
                                    <h4><b>KC CUP Guide</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Meta_Deck"><img src={TopTierPic} alt="top tier" /></Link>
                                <div className="container">
                                    <h4><b>Top Tier Decks</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Tournament"><img src={TournamentPic} alt="tournaments" /></Link>
                                <div className="container">
                                    <h4><b>Upcoming Tournaments</b></h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1>Additional Duel Links Content Creators on Youtube:</h1>
                    <ul>
                        <li><a href="https://www.youtube.com/channel/UCz_cNcJzCy4asffzW5ERH1w" target="_blank">Duel Links Meta</a></li>
                        <li><a href="https://www.youtube.com/channel/UCXgNU9GtLPiE2dAYDwIQO6Q" target="_blank">YTDan Duel Links</a></li>
                        <li><a href="https://www.youtube.com/channel/UCGmqsD0yv9B3GGlhGcP5_xA" target="_blank">Playmaker Duel Links</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Homepage;