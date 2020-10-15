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
                {props.isAuth ? <h3>Welcome: {props.name}!</h3> : null}
                {props.isAuth ? <img className="GooglePic" src={props.pic} alt={props.name} /> : null}
                {props.children}
            </main>
            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        pic: state.userPic,
        name: state.userName,
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Layout);