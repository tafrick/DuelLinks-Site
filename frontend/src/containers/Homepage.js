import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Logo from '../components/Logo/Logo';
import '../components/DeckTypes/Table.css';

import TournamentPic from '../assets/images/tournaments.png';
import TopTierPic from '../assets/images/top-tier-dekcs.png';
import BeginnersPic from '../assets/images/beginners-guide.png';
import KCPic from '../assets/images/kc-cup-things.png';
import Black from '../assets/images/black.PNG';

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div className="home-wrapper">
                    <h1 className="animate__animated animate__fadeIn animate__slower">Welcome to the Duel Links Academy!</h1>
                    <h3 className="animate__animated animate__fadeIn animate__slower">A fansite for the popular mobile game, no affiliation with Konami</h3>
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
                                <Link to="/Community"><img src={KCPic} alt="KC" /></Link>
                                <div className="container">
                                    <h4><b>KC CUP Guide</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Decks"><img src={TopTierPic} alt="top tier" /></Link>
                                <div className="container">
                                    <h4><b>Top Tier Decks</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Community"><img src={TournamentPic} alt="tournaments" /></Link>
                                <div className="container">
                                    <h4><b>Upcoming Tournaments</b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Community"><img src="https://media.giphy.com/media/xT9IgtMfKDZJbZ9QGs/giphy.gif" alt="tournaments" /></Link>
                                <div className="container">
                                    <h4><b>Enter the Shadow Realm<span className="test">[36 Chambers]</span></b></h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="guide">
                                <Link to="/Community"><img src={Black} alt="tournaments" /></Link>
                                <div className="container">
                                    <h4><b>Duel Links Academy Certified</b></h4>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}

export default Homepage;