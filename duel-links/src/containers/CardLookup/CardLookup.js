import React, { Component } from 'react';
import axios from 'axios';

import Grandpa from '../../components/Grandpa/Grandpa';
import './CardLookup.css';
import Cards from '../../components/Cards/Cards';
import Button from '@material-ui/core/Button';

class CardLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadedCards: null,
            text: ''
        }
    }
    // state = {
    //     loadedCards: null
    // }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleClick = (event) => {
        if(this.state.text != "") {
            this.createFilter(this.state.text);
        }
        
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
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=' + name)
                .then(response => {
                    let cards = [];
                    cards.push(response.data);
                    console.log(response.data);
                    this.setState({ loadedCards: cards })

                })
                .catch(error => {
                    console.error(error.message);
                })
        }
    }

    createFilter(filter) {
        const timer = setTimeout(() => {
            
            this.loadData(filter);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    };

    render() {
        let cards = <p>Search Some Cards</p>;
        if (this.state.loadedCards) {
            console.log('in if:');
            console.log(this.state.loadedCards[0].data);
            cards = this.state.loadedCards[0].data.map(card => {
                return (
                    <Cards
                        key={card.id}
                        title={card.name}
                        type={card.type}
                        image={card.card_images[0].image_url}
                        source={card.name}
                        effect={card.desc} />
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
                <form >
                    <label>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="Enter exact card name..." />
                    </label>
                    <Button variant = "contained" onClick={this.handleClick}>Submit</Button>
                </form>
                {cards}
            </div>
        );
    }
}

export default CardLookup;