import React from 'react';
import './Cards.css';

const cards = props => (
    <div className="card-wrapper">
        <h2>
            Name: {props.title}
            <br></br>
            Type: {props.type}
        </h2>
        <img src={props.image} alt={props.source} />
        <h2>Description: </h2>
        <p>{props.effect}</p>
    </div>
);

export default cards;