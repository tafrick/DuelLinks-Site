
import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        console.log("open pressed")
        attachedClasses = [classes.SideDrawer, classes.Open];
    } else {
        console.log("closed pressed")
        attachedClasses = [classes.SideDrawer, classes.Close];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;