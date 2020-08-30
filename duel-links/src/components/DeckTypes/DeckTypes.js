import React from 'react';
import { NavLink } from 'react-router-dom';

import yugip from '../../assets/images/yami-yugi.png';
import kaibap from '../../assets/images/SetoKaibaMD.png';
import joeyp from '../../assets/images/joey-wheeler.png';
import teap from '../../assets/images/TéaGardner-DULI.png';

import classes from './DeckTypes.module.css';

const deckTypes = (props) => {
    return (
            <div className="header">
                <h1>Look up more decks here</h1>
            <ul>
                <li className={classes.DeckTypes}>
                    <NavLink to="/" exact>Meta Tier Decks</NavLink>
                    <img src={yugip} alt="Meta Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/" exact>KOG Tier Decks</NavLink>
                    <img src={kaibap} alt="KOG Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/" exact>Casual Decks</NavLink>
                    <img src={joeyp} alt="Casual Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/" exact>Farming Decks</NavLink>
                    <img src={teap} alt="Farming Decks" />
                </li>
            </ul>
            </div>
    );
}

export default deckTypes;