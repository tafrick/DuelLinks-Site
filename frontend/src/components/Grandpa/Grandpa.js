import React from 'react';
import grandpaPic from '../../assets/images/grandpa-yugi.png';
import classes from './Grandpa.module.css';

const grandpa = props => (
    <div className={classes.Grandpa}>
        <img src={grandpaPic} alt="grandpa yugi"/>
    </div>
);

export default grandpa;