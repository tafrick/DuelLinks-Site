import React from 'react';
import './Cards.css';

const cards = props => (
    <div className="card-wrapper">
        <h1>
            Name: {props.title}
        </h1>
        <img src={props.image} alt={props.source} />
        <h2>Description: </h2>
        <p>{props.effect}</p>
    </div>
);

export default cards;