import React from 'react';
import ModalImage from "react-modal-image";
import './Cards.css';

const filterDetails = (card) => {

    if (card.attribute !== undefined) {
        return card.attribute + " / ";
    }
    return "";
}

const modalDescription = (name, desc) => {
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

const showLevel = (card) => {
    if (card.level !== undefined) {
        return (" / " + card.level + "⭑");
    }
    return "";
}

const showAtkDef = (card) => {
    if (card.level !== undefined) {
        return ("ATK/ " + card.atk + " DEF/ " + card.def);
    }
    return "";
}

const cards = props => (
    <div className="card-wrapper">
        <div className="col-img">
        <ModalImage
                    small={props.image}
                    large={props.image}
                    alt={modalDescription(props.title, props.effect)}
                    className="modal"
                    style={{width: 200}}
                />
           
            {/* <img src={props.image} alt={props.source} /> */}
        </div>
        <div className="col-text">
            <span id="card-name">{props.title}</span>
            <br></br>
            <br></br>
            <span id="card-type">{filterDetails(props)}{props.race} / {props.type}{showLevel(props)}</span>
            <br></br>
            <p id="atkDef">{showAtkDef(props)}</p>
            <p id="where-to-get">{props.box}</p>
            <p id="card-description">{props.effect}</p>
            
        </div>

    </div>
);

export default cards;