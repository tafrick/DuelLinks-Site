import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import DeckTypes from '../../components/DeckTypes/DeckTypes';
import classes from './Decks.module.css';

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
            return <p>Not Graded</p>
        }
        if (GPA >= 90) {
            return <h2 className="letterCircle" style={{ "color": "red" }}>S+</h2>
        } else if (GPA >= 80 && GPA < 90) {
            return <h2 className="letterCircle" style={{ "color": "red" }}>A+</h2>
        } else if (GPA >= 70 && GPA < 80) {
            return <h2 className="letterCircle" style={{ "color": "red" }}>B+</h2>
        } else if (GPA >= 60 && GPA < 70) {
            return <h2 className="letterCircle" style={{ "color": "red" }}>C+</h2>
        } else if (GPA >= 50 && GPA < 60) {
            return <h2 className="letterCircle" style={{ "color": "red" }}>D+</h2>
        } else {
            return <h2 className="letterCircle" style={{ "color": "red" }}>F</h2>
        }
    }

    render() {
        let decks = [];
        if (this.state.loadedDecks) {
            console.log(this.state.loadedDecks)
            decks = this.state.loadedDecks.map(deck => {
                let mainCards = deck.mainDeck.map(card => { return <img key={card.name + Math.random()} src={card.img} alt={card.name} /> })
                let extraCards = deck.extraDeck.map(xcard => { return <img key={xcard.name + Math.random()} src={xcard.img} alt={xcard.name} /> })
                return (
                    <div className={classes.DeckWrapper} key={deck._id}>
                        <h1>{deck.title}</h1>
                        <p>Submitted by: {deck.username}</p>
                        <h2>{deck.category}</h2>
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
                        <br></br>
                        {extraCards}
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