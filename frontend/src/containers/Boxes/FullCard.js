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
        // setTimeout(() => this.loadCard(), 2000);
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

    render() {

        return (
            <span>
                {this.props.box}
                {/* {<img src={this.props.getCard.img}/>} */}
                <span style={{display: "inline-block"}}>
                    {/* {ldcard} */}
                    {<ModalImage
                    small={this.props.getCard.img}
                    large={this.props.getCard.img}
                    alt={this.modalDescription(this.props.getCard.name, this.props.getCard.description)}
                    className="modal"
                />}
                </span>
                
            </span>
        );
    }
}

export default FullCard;