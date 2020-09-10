import React, { Component } from 'react';
import axios from 'axios';

import Cards from '../../components/Cards/Cards';

class FullBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedBox: null,
            cardsArray: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const boxID = this.props.match.params.boxId;
        axios.get('http://localhost:9000/boxes/' + boxID)
            .then(response => {
                const box = { ...response.data };
                const box_array = [...box.cardsIn];
                this.setState({ loadedBox: box, cardsArray: box_array });
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    render() {
        let Box = null;
        let displayCards = "";
        if (this.state.loadedBox) {
            Box = (
                <div>
                    <h2>{this.state.loadedBox.name}</h2>
                    <img src={this.state.loadedBox.img_src} alt={this.state.loadedBox.name} />
                </div>
            );
            displayCards = this.state.cardsArray.map((card, index) => {
                return (
                    <li key={index}>
                        <Cards
                            title={card} />
                    </li>
                );
            })
        }
        return (
            <div>
                <p>The BOX ID</p>
                <p>{this.props.match.params.boxId}</p>
                {Box}
                <ul>
                    {displayCards}
                </ul>
            </div>
        );
    }
}

export default FullBox;