import React, { Component } from 'react';
import axios from 'axios';
import './Table.css';

const data = require("./finalUpdatedBoxes.json");
const rows = data;


class Box extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedBox: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const boxName = this.props.match.params.boxName;
        axios.get('https://duellinksacademy.xyz/api/decks/' + data[0].name)
            .then(response => {
                const post = { ...response.data };
                this.setState({ loadedPost: boxName });
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    render() {
        let post = null;
        if (this.state.loadedBox) {
            post = (
                <div>
                    <h4>{this.state.loadedBox.name}</h4>
                    <p>{this.state.loadedBox.name}</p>
                </div>
            );
        }
        return (
            <div>
                <h1>Test</h1>
                {post}
            </div>
        );
    }
}

export default Box;