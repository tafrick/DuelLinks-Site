import React, { Component } from 'react';
import axios from 'axios';
import CardTraderGold from '../../assets/images/CardTraderGold.png';
import VagaBond from '../../assets/images/MagaBond.PNG';
import CardTraderBlack from '../../assets/images/CardTraderBlack.png';
import './DeckBuilder.css'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import CardData from './Cards.json';

let res = [];
let set = new Set();
class DeckBuilder extends Component {

    constructor() {
        super();
        this.state = {
            loadedCards: null,
            text: '',
            cardResults: [],
            deck: []
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault();
        if (this.state.text !== "" && this.state.text !== " ") {
            this.loadData(this.state.text);
            this.setState({ result: this.state.text });
            // this.setState({
            //     text: ''
            // });
        }
    }
    loadData(name) {

        const cards = [];
        if (name !== 'undefined') {
            // CardData.map(result => {        
            //     if(result.name.toLowerCase().includes(this.state.text.toLowerCase())){
            //         res.push(result);
            //     }
            // })
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=' + name)
                .then(response => {
                    let cards = [];
                    cards.push(response.data);
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
            // console.log("sasas" , this.state.cardResults);
        }
    }

    addToDeck(text) {

        let arr = [];
        arr.push(text);
        this.setState({
            deck: [...this.state.deck, text],
        })
    }

    removeCard(card) {
        let filteredArray = this.state.deck.filter(item => item !== card)
        this.setState({ deck: filteredArray });
    }


    render() {
        let tmp = "";
        let deckList = "";
        if (this.state.loadedCards) {
            tmp = this.state.loadedCards[0].data.map(card => {
                return (
                    <div className="img-container">
                        <img src={card.card_images[0].image_url} alt={card.name} />
                        <a className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.addToDeck(card)}>
                            Click to Add to Deck
                        </a>
                    </div>
                )
            })
        }

        if (this.state.deck) {
            deckList = this.state.deck.map(result => {

                return (
                    <div className="img-container">
                        <img src={result.card_images[0].image_url} alt={result.name} />
                        <a className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.removeCard(result)}>
                            Remove Card
                    </a>

                    </div>
                )
            })
        }


        return (
            <div className="page-wrapper">
                <div className="title">
                    <h1>Still can't get past MAGAbond? Perhaps we could be of assistance...</h1>
                    <img src={CardTraderGold} width="250" />
                    <img src={VagaBond} width="250" height="375" />
                    <img src={CardTraderBlack} width="260" />
                    <form onSubmit={this.handleClick}>
                        <label>
                            <input
                                type="text"
                                value={this.state.text}
                                onChange={this.handleChange}
                                placeholder="Enter card name..." />
                        </label>
                        <Button variant="contained" color="primary" onClick={this.handleClick}>Search</Button>
                    </form>
                </div>
                <div className="deck-wrapper">
                    <h1>Deck: </h1>
                    {deckList}

                </div>
                <div className="cards-wrapper">
                    {/* {console.log(res)} */}
                    <div className="display-results" style={{ display: "inline-block" }}>
                        {tmp}
                    </div>


                </div>

            </div>
        )
    }
}

export default DeckBuilder;