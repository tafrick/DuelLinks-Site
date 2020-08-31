import React, { Component } from 'react';
import axios from 'axios';

import Grandpa from '../../components/Grandpa/Grandpa';
import './CardLookup.css';
import Cards from '../../components/Cards/Cards';

class CardLookup extends Component {
    state = {
        loadedCards: null
    }

    // componentDidMount() {
    //     this.loadData();
    // }

    // componentDidUpdate() {
    //     this.loadData();
    // }

    loadData(name) {
        console.log(`name is ${name}`);
        if (name !== 'undefined') {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + name)
                .then(response => {
                    let cards = [];
                    cards.push(response.data);
                    this.setState({ loadedCards: cards })

                })
                .catch(error => {
                    console.error(error.message);
                })
        }
        if (!this.state.loadedCards) {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Decode%20Talker')
                .then(response => {
                    let cards = [];
                    cards.push(response.data);
                    this.setState({ loadedCards: cards })

                })
                .catch(error => {
                    console.error(error.message);
                })
        }
    }
    render() {
        let cards = <p>Search Some Cards</p>;
        if (this.state.loadedCards) {
            cards = this.state.loadedCards.map(card => {
                return (
                    <Cards
                        key={card.data[0].id}
                        title={card.data[0].name}
                        type={card.data[0].type}
                        image={card.data[0].card_images[0].image_url}
                        source={card.data[0].name}
                        effect={card.data[0].desc} />
                );
            })
        }
        return (
            <div className="CardLookup">
                <header>
                    <h5>Use API: https://db.ygoprodeck.com/api/v7/cardinfo.php</h5>
                    <Grandpa />
                    Hello! Which card would you like to search?
                </header>
                <form>
                    <label>
                        <input
                            type="text"
                            onChange={(event) => {
                                this.loadData(event.target.value)
                            }}
                            placeholder="Enter exact card name..." />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {cards}
            </div>
        );
    }
}

export default CardLookup;