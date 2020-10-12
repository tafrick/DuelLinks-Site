import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DeckTypes from '../../components/DeckTypes/DeckTypes';
import classes from './Decks.module.css';
import Collapsible from 'react-collapsible';
import ModalImage from "react-modal-image";

class Decks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedDecks: [],
            newDeckGrade: '100'
        }
    }

    componentDidMount() {
        this.fetchDecks();
    }

    fetchDecks() {
        axios.get('http://localhost:9000/decks')
            .then(response => {
                let decks = [...response.data];
                this.setState({ loadedDecks: decks })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    gradeDeckHandler(deckGrade, totalPoints, totalVotes, gradersList, deckId) {
        console.log(deckGrade);
        //only allow one grade for now
        if (!gradersList.includes(this.props.username)) {
            const newPointTotal = parseInt(totalPoints) + parseInt(deckGrade);
            const newVoterTotal = totalVotes + 1;
            const newGPA = newPointTotal / newVoterTotal;
            let newGradersList = [...gradersList];
            newGradersList.push(this.props.username);
            console.log(`new GPA is ${newGPA}`);
            const updatedDeck = {
                totalPoints: newPointTotal,
                graders: newGradersList,
                totalVotes: newVoterTotal,
                deckGPA: newGPA
            }
            console.log(updatedDeck);
            axios.patch('http://localhost:9000/decks/' + deckId, updatedDeck)
                .then(response => {
                    console.log("Update Successful!");
                    this.props.history.go('/decks');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else {
            alert("you may only grade once!");
        }
    }

    deckGradeCalcHandler(GPA, totalVotes) {
        if (totalVotes == 0) {
            return <div style={{ "color": "red" }}>Not Graded</div>
        }
        if (GPA >= 90) {
            return <div style={{ "color": "red" }}>S+</div>
        } else if (GPA >= 80 && GPA < 90) {
            return <div style={{ "color": "red" }}>A+</div>
        } else if (GPA >= 70 && GPA < 80) {
            return <div style={{ "color": "red" }}>B+</div>
        } else if (GPA >= 60 && GPA < 70) {
            return <div style={{ "color": "red" }}>C+</div>
        } else if (GPA >= 50 && GPA < 60) {
            return <div style={{ "color": "red" }}>D+</div>
        } else {
            return <div style={{ "color": "red" }}>F</div>
        }
    }

    classSelectHandler(category) {
        if (category === "Competitive" || category === "Competitive_Deck") {
            return classes.Obelisk
        } else if (category === "Casual") {
            return classes.Ra
        } else if (category === "Farming") {
            return classes.Slifer
        }
    }

    pictSelectHandler(category) {
        if (category === "Competitive" || category === "Competitive_Deck") {
            return <p>Oblisk Blue Dorm</p>
        } else if (category === "Casual") {
            return <p>Ra Yellow Dorm</p>
        } else if (category === "Farming") {
            return <p>Slifer Red Dorm</p>
        }
    }

    modalDescription = (name, desc) => 
        <>
            <div style={{ textAlign: "center" }}>
                {name}
            </div>
            <br></br>
            {desc}
        </>;

    render() {
        let decks = [];
        if (this.state.loadedDecks) {
            console.log(this.state.loadedDecks)
            decks = this.state.loadedDecks.map(deck => {
                // let mainCards = deck.mainDeck.map(card => { return <img key={card.name + Math.random()} src={card.img} alt={card.name} /> })
                let mainCards = deck.mainDeck.map(card =>  
                <span className={classes.modalTag}>
                    <span style={{width: "120px", margin: "0px 3px", display: "inline-block"}}>
                        {<ModalImage
                        small={card.img}
                        large={card.img}
                        alt={this.modalDescription(card.name, card.description)}
                        className="modal"
                        style={{width: "100px"}}
                    />}
                    </span>
                </span>
                )
                // let extraCards = deck.extraDeck.map(xcard => { return <img key={xcard.name + Math.random()} src={xcard.img} alt={xcard.name} /> })
                let extraCards = deck.extraDeck.map(xcard => 
                <span className={classes.modalTag}>
                    <span style={{width: "110px", margin: "0px 3px", display: "inline-block"}}>
                        {<ModalImage
                        small={xcard.img}
                        large={xcard.img}
                        alt={this.modalDescription(xcard.name, xcard.description)}
                        className="modal"
                    />}
                    </span>
                </span>
                )
                return (
                    <div className={[classes.DeckWrapper, this.classSelectHandler(deck.category)].join(' ')} key={deck._id}>
                        <Collapsible trigger={<div className={classes.DeckInfoWrapper}>
                            <div className={classes.categoryText}>{deck.category}</div>
                            <h1>{deck.title}</h1>
                            <p style={{color: "white"}}>Submitted by: <Link to={"/users/" + deck.username}>{deck.username}</Link></p>
                            {this.pictSelectHandler(deck.category)}

                            
                            <table className={classes.DeckInfo}>
                                <tr>
                                    <th>Deck Grade</th>
                                    <th>Total Votes</th>
                                </tr>
                                <tr>
                                    <td>{this.deckGradeCalcHandler(deck.deckGPA, deck.totalVotes)}</td>
                                    {deck.totalVotes == 1 ? <td>1 Vote</td> : <td>{deck.totalVotes} Votes</td>}
                                </tr>
                            </table>
                           
                            </div>}>
                            <div className={classes.GradeSelector}>
                                <label>Grade Deck</label>
                                <select value={this.state.newDeckGrade} disabled={!this.props.isAuth} onChange={(event) => this.setState({ newDeckGrade: event.target.value })}>
                                    <option value="100">S</option>
                                    <option value="89">A</option>
                                    <option value="79">B</option>
                                    <option value="69">C</option>
                                    <option value="59">D</option>
                                    <option value="49">F</option>
                                </select>
                                <button disabled={!this.props.isAuth} onClick={() => this.gradeDeckHandler(this.state.newDeckGrade, deck.totalPoints, deck.totalVotes, deck.graders, deck._id)}>Grade Deck</button>
                            </div>
                            {mainCards}
                            <hr/>
                            {extraCards}
                        </Collapsible>
                    </div>
                )
            })
        }
        return (
            <div className="pageWrapper">
                {decks}
            </div >
        );
    };
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAuth: state.token !== null,
        username: state.userEmail
    }
}

export default connect(mapStateToProps, null)(Decks);