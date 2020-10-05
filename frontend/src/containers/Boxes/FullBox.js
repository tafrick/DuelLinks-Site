import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import rateLimit from 'axios-rate-limit';
//import classes from './FullBox.module.css';
import './FullBox.css';
import Cards from '../../components/Cards/Cards';
import FullCard from './FullCard';



class FullBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedBox: null,
            cardsArray: [],
            loadedCards: null,

        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const boxID = this.props.match.params.boxId;
        axios.get('http://localhost:9000/boxes/' + boxID)
            .then(response => {
                // console.log("sdasdas",response.data.cardsIn)
                const box = { ...response.data };
                const box_array = [...box.cardsIn];
                this.setState({ loadedBox: box, cardsArray: box_array });
            })
            .catch(error => {
                console.error(error.message);
            })
    }


    loadCardData(name) {
        if (name !== 'undefined') {
            console.log(name);

        }
    }

    getDate(releaseDate) {
        const format = new Date(releaseDate);
        return(<div>Released: {format.toLocaleDateString()}</div>);
    }
    render() {

        let cards = "";
        if (this.state.loadedCards) {
            cards = this.state.box_array.map(card => {
                // console.log("cardData: " , card)
                return (
                    <Cards
                        key={card.id}
                        title={card.name}
                        effect={card.description}
                        image={card.img} />
                );
            })
        }

        let Box = null;
        let displayCards = "";
        
        if (this.state.loadedBox) {
            Box = (
                <div>
                    <h2>{this.state.loadedBox.name} [{this.state.loadedBox.cardsIn.length}]</h2>
                    <h4>{this.getDate(this.state.loadedBox.releaseDate)}</h4>
                    <img src={this.state.loadedBox.img_src} alt={this.state.loadedBox.name} />

                    
                </div>
            );

            displayCards = this.state.cardsArray.map((card, index) => {

                // this.loadCardData(card);

                return (
                    <span key={index}>
                        
                        {/* {console.log("name of card: ", card)} */}
                        
                        
                        {undefined ? null : <FullCard getCard = {card} />}
                        {/* <Link to={this.props.match.params.url + '/' + card}><span style={{display: "inline-block"}}>{card}</span>,</Link> */}
                        {/* {console.log('Link to: ' + this.props.match.params.url + '/' + card)} */}
                        {/* <FullCard box = {this.props.match.params.boxId} /> */}
                    </span>
                    // <table className={classes.cardlist}>
                    //     <tr>
                    //         <th>Card Name</th>
                    //         <th> Set </th>
                    //     </tr>
                    //     <tr>
                    //         <td><Link to={this.props.match.params.url + '/' + card}><p>{card}</p></Link></td>
                    //         <td>{this.state.loadedBox.name}</td>
                    //     </tr>
                    // </table>
                );
            })
        }
        // console.log("completed cycle: ",this.state.cardsArray);
        return (
            <div className="box-page">
                {Box}
                <br></br>
                <span className="cardlist">
                    {displayCards}
                </span>

            </div >
        );
        
    }
    
}

export default FullBox;