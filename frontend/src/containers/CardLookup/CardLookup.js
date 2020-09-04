import React, { Component } from 'react';
import axios from 'axios';

import Grandpa from '../../components/Grandpa/Grandpa';
import './CardLookup.css';
import Cards from '../../components/Cards/Cards';
import Button from '@material-ui/core/Button';
import Boxes from './yugioh-boxes-updated.json';
import cards from '../../components/Cards/Cards';

class CardLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadedCards: null,
            text: '',
            result: '',
            showResult: false,
            cardNotFound: true,
            showCardNotFound: false,
            loadedBoxes: null
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
            this.setState({
                showResult: true,
                text: ''
            });
        }
    }

    //componentDidMount() {
    //this.loadData();
    //this.postData();
    //}

    // componentDidUpdate() {
    //     this.loadData();
    // }


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
            axios.get('http://localhost:9000/boxes')
                .then(response => {
                    let boxes = { ...response.data };
                    this.setState({ loadedBoxes: boxes })
                    //console.log(boxes);
                })
                .catch(error => {
                    console.error(error.message);
                })
        }
    }

    postData() {
        for (let box_title in Boxes) {
            let newBox = {
                name: box_title,
                cardsIn: Boxes[box_title]
            }
            axios.post('http://localhost:9000/boxes', newBox)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    }

    cardBoxCheckHandler(name) {
        if (this.state.loadedBoxes) {
            for (let box in this.state.loadedBoxes) {
                let ithBoxCardsIn = this.state.loadedBoxes[box].cardsIn;
                for (let j in ithBoxCardsIn) {
                    if (ithBoxCardsIn[j] === name) {
                        let box_title = this.state.loadedBoxes[box].name;
                        return box_title;
                    }
                }
            }
            return null;
        }
        return null;
    }

    render() {
        let cards = "";
        if (this.state.loadedCards) {
            cards = this.state.loadedCards[0].data.map(card => {
                return (
                    <Cards
                        key={card.id}
                        title={card.name}
                        type={card.type}
                        race={card.race}
                        atk={card.atk}
                        def={card.def}
                        level={card.level}
                        attribute={card.attribute}
                        image={card.card_images[0].image_url}
                        source={card.name}
                        effect={card.desc}
                        box={(this.cardBoxCheckHandler(card.name) == null) ? 'Currently Unavailable' : this.cardBoxCheckHandler(card.name)} />
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
                    <Button variant="contained" color="primary" onClick={this.handleClick}>Search</Button>
                </form>
                {this.state.cardNotFound !== true && this.state.showCardNotFound && this.state.showResult && <h2 id="searchResult">Ahh! Based on your request for: <u>{this.state.result}</u> <br></br>this is what I have for you!</h2>}
                {this.state.cardNotFound && this.state.showCardNotFound && <h2 id="searchResult">Oh no! It doesn't appear like I have: <u>{this.state.result}</u>!</h2>}
                {cards}

            </div>
        );
    }
}

export default CardLookup;