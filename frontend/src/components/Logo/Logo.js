import React from 'react';
import links from '../../assets/images/Links.PNG';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo}>
        
        <a href=""><img src={links} style={{width: 600}} alt="Duel Links Logo"/></a>
    </div>
);

export default logo;