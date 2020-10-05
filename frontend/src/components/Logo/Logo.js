import React from 'react';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';

import duelLinksLogo from '../../assets/images/YuGiOh_Duel_Links-logo.png';
import links from '../../assets/images/Links.PNG';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';


const logo = props => (
    <div className={classes.Logo}>
        
        <a href=""><img src={links} style={{width: 500}} alt="Duel Links Logo"/></a>
    </div>
);

export default logo;