import React from 'react';

import duelLinksLogo from '../../assets/images/YuGiOh_Duel_Links-logo.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo}>
        <img src={duelLinksLogo} alt="Duel Links Logo"/>
    </div>
);

export default logo;