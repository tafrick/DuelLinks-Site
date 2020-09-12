import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import classes from './FullBox.module.css';


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
                        <Link to={this.props.match.params.url + '/' + card}><p>{card}</p></Link>
                    </li>
                    // <table className={classes.cardlist}>
                    //     <tr>
                    //         <th>Card Name</th>
                    //         <th> Set </th>
                    //     </tr>
                    //     <tr>
                    //         <td><Link to={this.props.match.params.url + '/' + card}><p>{card}</p></Link></td>
                    //         <td>{this.state.loadedBox.name}</td>
                    //     </tr>
                    // </table>
                );
            })
        }
        return (
            <div>
                {Box}
                <h4>Cards In:</h4>
                <ul className={classes.cardlist}>
                    {displayCards}
                </ul>
            </div >
        );
    }
}

export default FullBox;