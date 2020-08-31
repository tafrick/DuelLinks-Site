import React from 'react';

const cards = props => (
    <div>
        <h1>
            Title: {props.title}
        </h1>
        <img src={props.image} alt={props.source} />
        <p>Effect: {props.effect}</p>
    </div>
);

export default cards;