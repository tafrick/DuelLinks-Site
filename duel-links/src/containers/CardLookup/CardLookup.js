import React, { Component } from 'react';

import Grandpa from '../../components/Grandpa/Grandpa';
import './CardLookup.css';

class CardLookup extends Component{
    render () {
        return (
            <div className="CardLookup">
                <header>
                    <Grandpa />
                    Hello! Which card would you like to search?
                </header>
                <input type="text" placeholder="Search..."/>
            </div>
        );
    }
}

export default CardLookup;