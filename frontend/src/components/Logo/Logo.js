import React from 'react';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';

import duelLinksLogo from '../../assets/images/YuGiOh_Duel_Links-logo.png';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';


const logo = props => (
    <div className={classes.Logo}>
        
        <a href=""><img src={duelLinksLogo} alt="Duel Links Logo"/></a>
    </div>
);

export default logo;