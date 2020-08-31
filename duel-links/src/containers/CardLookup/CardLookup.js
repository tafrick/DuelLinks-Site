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
            text: '',
            result: '',
            showResult: false,
            cardNotFound: true,
            showCardNotFound: false
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault();
        if(this.state.text !== "" && this.state.text !== " "){
            this.loadData(this.state.text);
            this.state.result = this.state.text;
            this.setState({
                showResult: true,
                text: ''
            });
        }
    }
    
    // componentDidMount() {
    //     this.loadData();
    // }

    // componentDidUpdate() {
    //     this.loadData();
    // }


    loadData(name) {

        if (name !== 'undefined') {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=' + name)
                .then(response => {
                    let cards = [];
                    cards.push(response.data);
                    console.log(response.data);
                    this.setState({ 
                        loadedCards: cards,
                        cardNotFound: false
                     });
                })
                .catch(error => {
                    console.error(error.message);
                    this.setState({
                        cardNotFound: true,
                        showCardNotFound: true
                    })
                })
        }
    }

    render() {
        let cards = "";
        if (this.state.loadedCards) {
            console.log('in if:');
            console.log(this.state.loadedCards[0].data);
            cards = this.state.loadedCards[0].data.map(card => {
                return (
                    <Cards
                        key={card.id}
                        title={card.name}
                        type={card.type}
                        race={card.race}
                        atk = {card.atk}
                        def = {card.def}
                        level = {card.level}
                        attribute = {card.attribute}
                        image={card.card_images[0].image_url}
                        source={card.name}
                        effect={card.desc} />
                );
            })
        }
        return (
            <div className="CardLookup">
                <header>
                    <Grandpa />
                    Hello! Which card would you like to search?
                </header>
                <form onSubmit={this.handleClick}>
                    <label>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="Enter card name..." />
                    </label>
                    <Button variant = "contained" color="primary" onClick={this.handleClick}>Search</Button>
                </form>
                {this.state.cardNotFound !== true && this.state.showCardNotFound && this.state.showResult && <h2 id="searchResult">Ahh! Based on your request for: <u>{this.state.result}</u> <br></br>this is what I have for you!</h2>}
                {this.state.cardNotFound && this.state.showCardNotFound && <h2 id="searchResult">Oh no! It doesn't appear like I have: <u>{this.state.result}</u>!</h2>}
                {cards}

            </div>
        );
    }
}

export default CardLookup;