import React from 'react';
import './Cards.css';

const filterDetails = (card) => {

    if(card.attribute !== undefined) {
        return card.attribute + " / ";
    }
    return "";
}

const showLevel = (card) => {
    if(card.level !== undefined) {
        return (" / " + card.level + "⭑");
    }
    return "";
}

const showAtkDef = (card) => {
    if(card.level !== undefined) {
        return ("ATK/ " + card.atk + " DEF/ " + card.def);
    }
    return "";
}

const cards = props => (
    <div className="card-wrapper">
            <div className="col-img">
                <a href={props.image} target="_blank"><img src={props.image} alt={props.source} /></a>
                {/* <img src={props.image} alt={props.source} /> */}
            </div>
            <div className="col-text">   
                <span id="card-name">{props.title}</span>
                <br></br>
                <br></br>
                <span id="card-type">{filterDetails(props)}{props.race} / {props.type}{showLevel(props)}</span>
                <br></br>
                <p id="atkDef">{showAtkDef(props)}</p>
                <p id="card-description">{props.effect}</p>
            </div>

    </div>
);

export default cards;