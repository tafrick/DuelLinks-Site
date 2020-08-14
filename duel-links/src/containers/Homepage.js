import React, { Component } from 'react';

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
                <div style={{display: "inline-grid", background: "no-repeat", alignContent: "center", padding: "0 20px"}}>
                    <a href='https://play.google.com/store/apps/details/?id=jp.konami.duellinks&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                        <img  style={{ width: "auto%", height: "55px"}} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                    </a>
                    <a href="https://apps.apple.com/de/app/yu-gi-oh-duel-links/id1068378177?mt=8">
                        <img style={{ width: "88%", margin: "6%"}} alt="Get it from app store" src='https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-01-18&kind=iossoftware&bubble=ios_apps'/>
                    </a>
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