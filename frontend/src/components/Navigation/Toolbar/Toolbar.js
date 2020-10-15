import React from 'react';
import { connect } from 'react-redux';

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
                {props.isAuth ? <h3>Welcome: {props.name}!</h3> : null}
                {props.isAuth ? <img className="GooglePic" src={props.pic} alt={props.name} /> : null}
            </div>
            {props.isAuth ? <img className="GooglePic" src={props.pic} alt={props.name} /> : null}
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

const mapStateToProps = state => {
    return {
        pic: state.userPic,
        name: state.userName,
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(toolbar);