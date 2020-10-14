import React from 'react';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';
import GoogleBtn from '../../../components/Login/GoogleBtn';

const toolbar = (props) => {

    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={styles.Logo}>
                <GoogleBtn />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;