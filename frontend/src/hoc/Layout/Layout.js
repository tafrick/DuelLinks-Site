import React, { useState } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Navigation/Footer/Footer';
import classes from './Layout.module.css'

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerVisibility] = useState(false);

    const sideDrawerOpenHandler = () => {
        setSideDrawerVisibility(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerOpenHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    )
};

export default Layout;