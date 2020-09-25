import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';


const navigationItems = (props) => (

    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/boxes" exact>Boxes</NavigationItem>
        <NavigationItem link="/cardlookup" exact>Card Lookup</NavigationItem>
        <NavigationItem link="/decks" exact>Decks</NavigationItem>
        <NavigationItem link="/community" exact>Community</NavigationItem>
    </ul>


);

export default navigationItems;