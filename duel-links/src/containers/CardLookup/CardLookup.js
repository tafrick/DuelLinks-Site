import React, { Component } from 'react';

import Grandpa from '../../components/Grandpa/Grandpa';
import './CardLookup.css';

class CardLookup extends Component{
    render () {
        return (
            <div className="CardLookup">
                <header>
                    <h5>Use API: https://db.ygoprodeck.com/api/v7/cardinfo.php</h5>
                    <Grandpa />
                    Hello! Which card would you like to search?
                </header>
                <form>
                    <label>

                        <input type="text" name="name" placeholder="Enter card name..."/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CardLookup;