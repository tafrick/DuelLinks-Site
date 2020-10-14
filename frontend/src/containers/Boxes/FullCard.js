import React, { Component } from 'react';
import ModalImage from "react-modal-image";
import './FullBox.css'

class FullCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedCard: null
        }
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
                <span style={{display: "inline-block"}}>
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