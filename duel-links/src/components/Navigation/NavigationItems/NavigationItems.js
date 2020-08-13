import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/cardlookup" exact>Card Lookup</NavigationItem>
    </ul>
);

export default navigationItems;