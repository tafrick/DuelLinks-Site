import React from 'react';
import { NavLink } from 'react-router-dom';

import yugip from '../../assets/images/yami-yugi.png';
import kaibap from '../../assets/images/SetoKaibaMD.png';
import joeyp from '../../assets/images/joey-wheeler.png';
import teap from '../../assets/images/TéaGardner-DULI.png';

import Button from '@material-ui/core/Button';

import classes from './DeckTypes.module.css';
import Table from './Table.js';

const deckTypes = (props) => {
    return (
        <div className="header">
            <h1>Look up more decks here</h1>
            <ul>
                <li className={classes.DeckTypes}>
                    <NavLink to="/Meta_Deck" exact><Button variant="contained" color="primary">Meta Tier Decks </Button></NavLink>
                    <img src={yugip} alt="Meta Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/KOG_Deck" exact><Button variant="contained" color="primary">KoG Tier Decks</Button></NavLink>
                    <img src={kaibap} alt="KOG Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/Casual_Deck" exact><Button variant="contained" color="primary">Casual Decks</Button></NavLink>
                    <img src={joeyp} alt="Casual Decks" />
                </li>
                <li className={classes.DeckTypes}>
                    <NavLink to="/Farming_Deck" exact><Button variant="contained" color="primary">Farming Decks</Button></NavLink>
                    <img src={teap} alt="Farming Decks" />
                </li>
            </ul>
        </div>
    );
}

export default deckTypes;