import React, { Component } from 'react';

import axios from 'axios';
import Cards from '../../components/Cards/Cards';

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

    loadCard() {
        axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + this.props.match.params.cardName)
            .then(response => {
                const card = { ...response.data };
                this.setState({ loadedCard: card });
            })
            .catch(error => {
                console.error(error.message);
            })
    }
    render() {
        let ldcard = null;
        if (this.state.loadedCard) {
            console.log(this.state.loadedCard);
            let card = { ...this.state.loadedCard.data[0] }
            console.log(card);
            ldcard = <Cards
                key={card.id}
                title={card.name}
                type={card.type}
                race={card.race}
                atk={card.atk}
                def={card.def}
                level={card.level}
                attribute={card.attribute}
                image={card.card_images[0].image_url}
                source={card.name}
                effect={card.desc}
            />;
        }
        return (
            <div>
                <p>Here you go you little bitch!</p>
                {ldcard}
            </div>
        );
    }
}

export default FullCard;