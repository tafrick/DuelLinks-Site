import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import ModalImage from "react-modal-image";
import CardTraderGold from '../../assets/images/CardTraderGold.png';
import VagaBond from '../../assets/images/MagaBond.PNG';
import CardTraderBlack from '../../assets/images/CardTraderBlack.png';
import './DeckBuilder.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

class DeckBuilder extends Component {
    constructor() {
        super();
        this.state = {
            loadedCards: null,
            text: '',
            cardResults: [],
            deck: [],
            extra: [],
            newDeckTitle: '',
            newDeckCategory: 'None',
            newDeckSkill: '',
            displayTitle: true,
            displayDeck: false,
            displaySubmit: false,
            validDeck: true
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
        }
    }
    loadData(name) {
        if (name !== 'undefined') {
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
        }
    }

    cardLimit(card, arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === card) {
                count++;
            }
        }

        return count;
    }

    addToDeck(text) {
        if (this.cardLimit(text.name, this.state.deck) < 3) {
            let arr = [];
            const newText = {
                name: text.name,
                img: text.card_images[0].image_url,
                description: text.desc
            }
            arr.push(newText);
            if (this.state.deck.length < 30) {
                let deckArray = [...this.state.deck];
                deckArray.push(newText);
                deckArray.sort(deckArray.name);
                this.setState({
                    deck: deckArray,

                })
            }
        }
    }

    addToExtra(text) {
        if (this.cardLimit(text.name, this.state.extra) < 3) {
            let arr = [];
            const newText = {
                name: text.name,
                img: text.card_images[0].image_url,
                description: text.desc
            }
            arr.push(newText);
            if (this.state.extra.length < 6) {
                let extraDeckArray = [...this.state.extra];
                extraDeckArray.push(newText);
                this.setState({
                    extra: extraDeckArray
                })
            }
        }
    }

    removeCard(card, state) {
        let filteredArray = state.filter(item => item !== card)
        state === this.state.deck ? this.setState({ deck: filteredArray }) :
            this.setState({ extra: filteredArray });
    }

    validateType(card) {
        let types = ["Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster"
            , "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster"
            , "XYZ Monster", "XYZ Pendulum Effect Monster"];
        const validate = types.some(type => card.type === type);
        validate ? this.addToExtra(card) : this.addToDeck(card);
        this.setState({ displayDeck: true, displayTitle: false })
    }

    checkDeckValidity = () => {
        let deckIsValid = false;
        const newTitle = this.state.newDeckTitle;

        if ((newTitle.length > 0) && (newTitle.length <= 60)) {
            deckIsValid = true;
        }

        this.setState({ validDeck: deckIsValid })
        if (deckIsValid) {
            return this.submitDeckHandler();
        } else {
            return deckIsValid;
        }
    }

    submitDeckHandler = () => {

        if (this.props.isAuth) {
            const newDeck = {
                title: this.state.newDeckTitle,
                category: this.state.newDeckCategory,
                skill: this.state.newDeckSkill,
                username: this.props.username,
                mainDeck: this.state.deck,
                extraDeck: this.state.extra
            };
            axios.post('https://duellinksacademy.xyz/api/decks/', newDeck)
                .then(response => {
                    this.props.history.go('/decks');
                })
                .catch(err => {
                    console.error({ message: err.message })
                })
        } else {
            return 0;
        }
    }

    render() {
        let searchResults = "";
        let deckList = "";
        let extraList = "";
        let inputTitleClass = "title-input";
        let inputTitlePlaceholder = "Deck title...";
        if (!this.state.validDeck) {
            inputTitleClass = "title-input-invalid";
            inputTitlePlaceholder = "Title Required!"
        }
        if (this.state.loadedCards) {
            searchResults = this.state.loadedCards[0].data.map(card => {
                return (
                    <div className="img-container" key={card.name + Math.random()}>
                        <ModalImage
                            small={card.card_images[0].image_url}
                            large={card.card_images[0].image_url}
                            alt={card.name}
                            className="modal"
                        />
                        <div className="overlay">
                            <span href="#" className="icon">
                                <BsFillPlusSquareFill
                                    className="icon-img"
                                    size="35px"
                                    color="white"
                                    right="0"
                                    top="0"
                                    onClick={() => this.validateType(card)}
                                    style={{ cursor: "pointer" }}
                                />
                            </span>
                        </div>
                    </div>
                )
            })
        }

        if (this.state.deck) {
            deckList = this.state.deck.map(result => {

                return (
                    <div className="deck-container" key={result.name + Math.random()}>
                        <img src={result.img} alt={result.name} />
                        <button className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.removeCard(result, this.state.deck)}>
                            Remove Card
                        </button>
                    </div>
                )
            })
        }

        if (this.state.extra) {
            extraList = this.state.extra.map(result => {
                return (
                    <div className="deck-container" key={result.name + Math.random()}>
                        <img src={result.img} alt={result.name} />
                        <button className="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => this.removeCard(result, this.state.extra)}>
                            Remove Card
                        </button>
                    </div>
                )
            })
        }


        return (
            <div className="page-wrapper">
                {this.state.displayTitle ? <div className="title">
                    <h1>Still can't get past MAGAbond? Perhaps we could be of assistance...</h1>
                    <img src={CardTraderGold} width="250" alt="CardTraderGold" />
                    <img src={VagaBond} width="250" height="375" alt="MagaBond" />
                    <img src={CardTraderBlack} width="260" alt="CardTraderBlack" />
                </div> : ""}

                <div className="mobile-Shifted" style={{ width: "45%", float: "left", display: "grid", minWidth: "350px" }}>
                    <div style={{ width: "100%", height: "55px" }}>
                        <form onSubmit={this.handleClick}>
                            <label>
                                <input
                                    className="search-input"
                                    type="text"
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                    placeholder="Enter card name..." />
                            </label>
                            <button onClick={this.handleClick}><SearchIcon /></button>
                        </form>
                    </div>
                    {(this.state.loadedCards) ?
                        <div className="searchWrapper">
                            <div className="searchComponent">
                                <div className="cards-wrapper">
                                    <div className="display-results" style={{ display: "inline-block" }}>
                                        {searchResults}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="emptySearch">
                            <div className="empty-container">
                                <SearchIcon style={{ "fill": "gray" }} />
                                <p>Look up some cards...</p>
                            </div>
                        </div>}
                </div>

                <div className="mobile-Shifted" style={{ width: "45%", float: "right", display: "grid", minWidth: "350px" }}>
                    <div style={{ width: "100%", height: "55px" }}>
                        <input className={inputTitleClass} type="text" value={this.state.newDeckTitle} onChange={(event) => this.setState({ newDeckTitle: event.target.value })} placeholder={inputTitlePlaceholder} />
                        <span className="skill-container" style={{ width: "15%" }}>
                            <img src="https://d33wubrfki0l68.cloudfront.net/1f0c6ee2d9b3dd18413e2b0a7c6f6fa7703713dc/4dc02/img/assets/skill.png" width="30px" alt="skills-logo" />
                            <input style={{ width: "30%", maxWidth: "40ch" }} className="skill-input" type="text" value={this.state.newDeckSkill} onChange={(event) => this.setState({ newDeckSkill: event.target.value })} placeholder="Input skill if any..." />
                        </span>
                    </div>
                    {((this.state.deck.length > 0) || (this.state.extra.length > 0)) ?
                        <div className="build-wrapper">

                            <div className="builderComponent">
                                <div className="deck-wrapper">
                                    <div className="Built_So_FAR">
                                        {deckList}
                                        {extraList.length === 0 ? "" : <hr />}
                                        {extraList}
                                    </div>
                                </div>
                            </div>
                            <br></br>
                        </div>
                        : <div className="emptyWrapper">
                            <div className="empty-container">
                                <AddCircleIcon style={{ "fill": "gray" }} />
                                <p>Add some cards to your deck...</p>
                            </div>
                        </div>
                    }
                    {
                        this.state.deck.length >= 20 ? <div className="submitWrapper">
                            <select value={this.state.newDeckCategory} onChange={(event) => this.setState({ newDeckCategory: event.target.value })} style={{ "marginTop": "1em", marginBottom: "1em" }}>
                                <option value="None">Select Deck Type</option>
                                <option value="Competitive">Competitive Deck</option>
                                <option value="Casual">Casual Deck</option>
                                <option value="Farming">Farming Deck</option>
                            </select>
                            <br></br>
                            <button disabled={this.state.newDeckCategory === "None"} onClick={this.checkDeckValidity}>Submit Decklist</button>
                        </div> : ""
                    }
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuth: state.token !== null,
        username: state.userEmail
    }
}

export default connect(mapStateToProps, null)(DeckBuilder);