import React from 'react';

import Icon from '../../Logo/Icon';
import styles from './Footer.module.css';

const footer = (props) => {

    return (
        <div className={styles.Footer}>
            <Icon />
            <div style={{display: "contents", background: "no-repeat", margin: "auto", width: "50%", padding: "10px"}}>
                <a href='https://play.google.com/store/apps/details/?id=jp.konami.duellinks&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <img  style={{ width: "auto%", height: "55px"}} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                </a>
                <a href="https://apps.apple.com/de/app/yu-gi-oh-duel-links/id1068378177?mt=8">
                    <img style={{ width: "88%", margin: "6%"}} alt="Get it from app store" src='https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-01-18&kind=iossoftware&bubble=ios_apps'/>
                </a>
                <iframe src="https://store.steampowered.com/widget/601510/" title="steam" frameBorder="0" width="646" height="190"></iframe>
            </div>
        </div>
    );
};

export default footer;