import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';


const navigationItems = (props) => (

    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/cardlookup" exact>Card Lookup</NavigationItem>
        <NavigationItem link="/decks" exact>Decks</NavigationItem>
        <NavigationItem link="/beginners" exact>Beginner's Guide</NavigationItem>
        <NavigationItem link="/community" exact>Community</NavigationItem>
    </ul>

    
);

export default navigationItems;