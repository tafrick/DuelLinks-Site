import React, { Component } from 'react';

import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import ModalImage from "react-modal-image";
import Cards from '../../components/Cards/Cards';
import FullBox from './FullBox';
import './FullBox.css'


class FullCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedCard: null
        }
    }

    componentDidMount() {
        this.loadCard();
    }

    modalDescription(name, desc) {
        return(
            <>
            <div style={{textAlign: "center"}}>
                {name}
            </div>
                <br></br>
                {desc}
            
            </>
        );
    }
    loadCard() {
        // axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + this.props.cardName)
        const http = rateLimit(axios.create(), 
            { maxRequests: 1, perMilliseconds: 1500, maxRPS: 2 })
            http.getMaxRPS();
            http.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=' + this.props.cardName)
            .then(response => {
                const card = { ...response.data };
                this.setState({ loadedCard: card });
            })
            .catch(error => {
                console.error(error.message);
            })
    }
    render() {
        const cardName = this.props.cardName;
        console.log('Fullcard data: ' + this.state.loadedCard);
        //console.log("fullcard: ", this.props.cardName);

        let ldcard = null;
        if (this.state.loadedCard) {
            //console.log("box: " ,this.props.box);
            let card = { ...this.state.loadedCard.data[0] }
            console.log('2card: ' + card.desc);
            ldcard = <span style={{display: "inline-block"}}>
                <ModalImage
                    small={card.card_images[0].image_url}
                    large={card.card_images[0].image_url}
                    alt={this.modalDescription(cardName, card.desc)}
                    
                    className="modal"
                />
                {/* <img src = {card.card_images[0].image_url} style={{width: 200}}/> */}

            </span>
        }
        return (
            <span>
                {this.props.box}
                <span style={{display: "inline-block"}}>
                    {ldcard}
                </span>
                
            </span>
        );
    }
}

export default FullCard;