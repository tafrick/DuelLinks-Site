import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './Decks.module.css';
import Collapsible from 'react-collapsible';
import ModalImage from "react-modal-image";
import Button from '@material-ui/core/Button';

class Decks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedDecks: [],
            newDeckGrade: '100',
            filter_grade: '0',
            filter_category: '0',
        }
    }

    componentDidMount() {
        this.fetchDecks();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.filter_category !== prevState.filter_category) {
            if (this.state.filter_category === "0") {
                this.fetchDecks();
            } else {
                axios.get('http://localhost:9000/decks/category=/' + this.state.filter_category)
                    .then(response => {
                        const decks = [...response.data];
                        this.setState({ loadedDecks: decks })
                    })
                    .catch(error => {
                        console.error(error.message);
                    })
            }
        }
        if (this.state.filter_grade !== prevState.filter_grade) {
            if (this.state.filter_grade === "0") {
                this.fetchDecks();
            } else {
                axios.get('http://localhost:9000/decks/deckGPA=/' + this.state.filter_grade)
                    .then(response => {
                        const decks = [...response.data];
                        this.setState({ loadedDecks: decks })
                    })
                    .catch(error => {
                        console.error(error.message);
                    })
            }
        }
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
        //only allow one grade for now
        if (!gradersList.includes(this.props.username)) {
            const newPointTotal = parseInt(totalPoints) + parseInt(deckGrade);
            const newVoterTotal = totalVotes + 1;
            const newGPA = newPointTotal / newVoterTotal;
            let newGradersList = [...gradersList];
            newGradersList.push(this.props.username);
            const updatedDeck = {
                totalPoints: newPointTotal,
                graders: newGradersList,
                totalVotes: newVoterTotal,
                deckGPA: newGPA
            }
            axios.patch('http://localhost:9000/decks/' + deckId, updatedDeck)
                .then(response => {
                    this.props.history.go('/decks');
                })
                .catch(err => {
                    console.error(err.message);
                })
        } else {
            return 0;
        }
    }

    deckGradeCalcHandler(GPA, totalVotes) {
        if (totalVotes === 0) {
            return <div style={{ "color": "red" }}>Not Graded</div>
        }
        if (GPA >= 90) {
            return <div style={{ "color": "silver", "fontSize": "150%", "fontFamily": "Verdana" }}><b>S</b></div>
        } else if (GPA >= 80 && GPA < 90) {
            return <div style={{ "color": "green", "fontSize": "150%", "fontFamily": "Verdana" }}><b>A</b></div>
        } else if (GPA >= 70 && GPA < 80) {
            return <div style={{ "color": "yellow", "fontSize": "150%", "fontFamily": "Verdana" }}><b>B</b></div>
        } else if (GPA >= 60 && GPA < 70) {
            return <div style={{ "color": "#FFC04C", "fontSize": "150%", "fontFamily": "Verdana" }}><b>C</b></div>
        } else if (GPA >= 50 && GPA < 60) {
            return <div style={{ "color": "orange", "fontSize": "150%", "fontFamily": "Verdana" }}><b>D</b></div>
        } else {
            return <div style={{ "color": "red", "fontSize": "150%", "fontFamily": "Verdana" }}><b>F</b></div>
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
            decks = this.state.loadedDecks.map(deck => {
                // let mainCards = deck.mainDeck.map(card => { return <img key={card.name + Math.random()} src={card.img} alt={card.name} /> })
                let mainCards = deck.mainDeck.map(card =>
                    <span className={classes.modalTag} key={card.name + Math.random()}>
                        <span style={{ width: "120px", margin: "0px 3px", display: "inline-block" }}>
                            {<ModalImage
                                small={card.img}
                                large={card.img}
                                alt={this.modalDescription(card.name, card.description)}
                                className="modal"
                                style={{ width: "100px" }}
                            />}
                        </span>
                    </span>
                )
                let extraCards = deck.extraDeck.map(xcard =>
                    <span className={classes.modalTag} key={xcard.name + Math.random()}>
                        <span style={{ width: "110px", margin: "0px 3px", display: "inline-block" }}>
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
                            <h2>{deck.title}</h2>
                            <p>Submitted by: <Link to={"/users/" + deck.username}>{deck.username}</Link></p>
                            {this.pictSelectHandler(deck.category)}


                            <table className={classes.DeckInfo}>
                                <tr>
                                    <th>Deck Type</th>
                                    <th>Deck Grade</th>
                                    <th>Total Votes</th>
                                </tr>
                                <tr>
                                    <td>{deck.category}</td>
                                    <td>{this.deckGradeCalcHandler(deck.deckGPA, deck.totalVotes)}</td>
                                    {deck.totalVotes === 1 ? <td>1 Vote</td> : <td>{deck.totalVotes} Votes</td>}
                                </tr>
                            </table>

                        </div>}>
                            <div className={classes.GradeSelector}>
                                {/* <label>Grade Deck</label> */}
                                <select value={this.state.newDeckGrade} disabled={!this.props.isAuth} onChange={(event) => this.setState({ newDeckGrade: event.target.value })}>
                                    <option value="100">S</option>
                                    <option value="89">A</option>
                                    <option value="79">B</option>
                                    <option value="69">C</option>
                                    <option value="59">D</option>
                                    <option value="49">F</option>
                                </select>
                                <Button variant="outlined" disabled={!this.props.isAuth} onClick={() => this.gradeDeckHandler(this.state.newDeckGrade, deck.totalPoints, deck.totalVotes, deck.graders, deck._id)}>Grade Deck</Button>
                            </div>

                            {mainCards}
                            {extraCards.length === 0 ? "" : <hr />}
                            {extraCards}
                        </Collapsible>
                    </div>
                )
            })
        }
        return (
            <div className={classes.pageTrapper}>
                <div className="pageWrapper">
                    <div className={classes.FilterWrapper}>
                        <div className={classes.Filter}>
                            <p>Deck Type</p>
                            <select value={this.state.filter_category} onChange={(event) => this.setState({ filter_category: event.target.value })}>
                                <option value="0">Toggle All</option>
                                <option value="Competitive">Competitive (Obelisk)</option>
                                <option value="Farming">Farming (Slifer)</option>
                                <option value="Casual">Casual (Ra)</option>
                            </select>
                        </div>
                        <div className={classes.Filter}>
                            <p>Deck Grades</p>
                            <select value={this.state.filter_grade} onChange={(event) => this.setState({ filter_grade: event.target.value })}>
                                <option value="0">Toggle All</option>
                                <option value="100">S</option>
                                <option value="89">A</option>
                                <option value="79">B</option>
                                <option value="69">C</option>
                                <option value="59">D</option>
                                <option value="49">F</option>
                            </select>
                        </div>
                    </div>
                    {decks}
                </div >
            </div>

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