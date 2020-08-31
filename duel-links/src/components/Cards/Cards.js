import React from 'react';
import './Cards.css';

const filt = (card) => {

    if(card.attribute != undefined) {
        return card.attribute + " / ";
    }
    else{
        return "";
    }
}
const cards = props => (
    <div className="card-wrapper">

            <div className="col-img">
                <img src={props.image} alt={props.source} />
            </div>
            <div className="col-text">   
                <span id="card-name">{props.title}</span>
                <br></br>
                <br></br>
                <span id="card-type">{filt(props)}{props.race} / {props.type}</span>
                <br></br>
                <br></br>
                <p id="card-description">{props.effect}</p>
            </div>

    </div>
);

export default cards;