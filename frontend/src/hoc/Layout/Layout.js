import React, { useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Navigation/Footer/Footer';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerVisibility] = useState(false);
    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    }

    const sideDrawerOpenHandler = () => {
        setSideDrawerVisibility(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerOpenHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Layout);