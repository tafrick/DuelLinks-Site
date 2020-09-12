import React from 'react';

import Logo from '../../Logo/Logo';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const toolbar = (props) => {

    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;