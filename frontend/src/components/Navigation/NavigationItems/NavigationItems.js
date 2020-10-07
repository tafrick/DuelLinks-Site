import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';


const navigationItems = (props) => (

    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/boxes" exact>Boxes</NavigationItem>
        <NavigationItem link="/cardlookup" exact>Card Lookup</NavigationItem>
        <NavigationItem link="/deckbuilder" exact>Deck Builder</NavigationItem>
        <NavigationItem link="/decks" exact>Decks</NavigationItem>
        <NavigationItem link="/community" exact>Community</NavigationItem>
        {props.isAuth ? <NavigationItem link={"/my_posts/" + props.email} exact>My Posts</NavigationItem> : null}
    </ul>


);

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuth: state.token !== null,
        email: state.userEmail
    }
}

export default connect(mapStateToProps, null)(navigationItems);