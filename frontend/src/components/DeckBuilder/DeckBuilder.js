import React, { Component } from 'react';
import axios from 'axios';
import CardTraderGold from '../../assets/images/CardTraderGold.png';
import VagaBond from '../../assets/images/MagaBond.PNG';
import CardTraderBlack from '../../assets/images/CardTraderBlack.png';
import './DeckBuilder.css'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import CardData from './Cards.json';

class DeckBuilder extends Component {
    constructor() {
        super();
        this.state = {
            loadedCards: null,
            text: '',
            cardResults: [],
            deck: [],
            extra: []
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
        if(this.state.deck.length <= 30) {
            this.setState({
                deck: [...this.state.deck, text],
            })
        }
        
    }

    addToExtra(text) {
        console.log("addToExtra: " , text);
        let arr = [];
        arr.push(text);
        if(this.state.extra.length <= 6) {
            this.setState({
                extra: [...this.state.extra, text],
            })
        } else{
            return(<div>Exceeds max limit</div>) //change
        }
        
    }

    removeCard(card, state) {
        let filteredArray = state.filter(item => item !== card)
        state === this.state.deck ? this.setState({ deck: filteredArray }) :
        this.setState({extra: filteredArray});
    }


    validateType(card) {
        let types = ["Fusion Monster", "Link Monster" ,"Pendulum Effect Fusion Monster"
        ,"Synchro Monster" ,"Synchro Pendulum Effect Monster" ,"Synchro Tuner Monster"
        ,"XYZ Monster", "XYZ Pendulum Effect Monster"];
        console.log(card);
        const validate = types.some(type => card.type === type);
        console.log(validate);
        validate ?  this.addToExtra(card) : this.addToDeck(card);
    }


    render() {
        let searchResults = "";
        let deckList = "";
        let extraList = "";
        if (this.state.loadedCards) {
            searchResults = this.state.loadedCards[0].data.map(card => {
                return (
                    <div className="img-container">
                        <img src={card.card_images[0].image_url} alt={card.name} />
                        <a className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.validateType(card)}>
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
                            onClick={() => this.removeCard(result, this.state.deck)}>
                            Remove Card
                    </a>

                    </div>
                )
            })
        }

        if (this.state.extra) {
            extraList = this.state.extra.map(result => {
                return (
                    <div className="img-container">
                        <img src={result.card_images[0].image_url} alt={result.name} />
                        <a className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.removeCard(result, this.state.extra)}>
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
                    <h1>Extra: </h1>
                    {extraList}

                </div>
                <div className="cards-wrapper">
                    {/* {console.log(res)} */}
                    <div className="display-results" style={{ display: "inline-block" }}>
                        {searchResults}
                    </div>


                </div>

            </div>
        )
    }
}

export default DeckBuilder;