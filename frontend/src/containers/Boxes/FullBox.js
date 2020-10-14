import React, { Component } from 'react';
import axios from 'axios';
import './FullBox.css';
import FullCard from './FullCard';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

class FullBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedBox: null,
            cardsArray: [],
            loadedCards: null,
            searchResult: [],
            displaySearch: false,
            displayDefault: true

        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const boxID = this.props.match.params.boxId;
        axios.get('http://localhost:9000/boxes/' + boxID)
            .then(response => {
                // console.log("sdasdas",response.data.cardsIn)
                const box = { ...response.data };
                const box_array = [...box.cardsIn];
                this.setState({ loadedBox: box, cardsArray: box_array });
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    loadResult(text) {
        this.setState({ searchResult: [] });
        let searchResultArr = [];
        for (let i = 0; i < this.state.cardsArray.length; i++) {
            if (this.state.cardsArray[i].name.toLowerCase().includes(text.toLowerCase())) {
                searchResultArr.push(this.state.cardsArray[i]);
            }
        }
        this.setState({
            searchResult: searchResultArr,
            displaySearch: true,
            displayDefault: false
        })
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault();
        if (this.state.text !== "" && this.state.text !== " ") {
            this.setState({
                searchResult: [],
                displaySearch: false
            });
            this.loadResult(this.state.text);
        }
    }

    getDate(releaseDate) {
        const format = new Date(releaseDate);
        return(<div>Released: {format.toLocaleDateString()}</div>);
    }
    render() {
        let Box = null;
        let searchResults= "";
        let displayCards = "";
        
        searchResults = (
            <div className="card-search-container">
                <form onSubmit={this.handleClick}>
                    <label>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="Search card name..." />
                        <Button variant="contained" color="primary" onClick={this.handleClick}><SearchIcon /></Button>
                    </label>
                </form>
                <br></br>
                <div className="search-results">
                    {this.state.searchResult.map(card => {
                        return (<span>
                            {undefined ? null : <FullCard getCard = {card} />}
                        </span>)
                    }
                    )}
                </div>
            </div>
        );
        
        if (this.state.loadedBox) {
            Box = (
                <div>
                    <h2>{this.state.loadedBox.name} [{this.state.loadedBox.cardsIn.length}]</h2>
                    <h4>{this.getDate(this.state.loadedBox.releaseDate)}</h4>
                    <img src={this.state.loadedBox.img_src} alt={this.state.loadedBox.name} />
                </div>
            );

            displayCards = this.state.cardsArray.map((card, index) => {
                return (
                    <span key={index}>
                        {undefined ? null : <FullCard getCard = {card} />}
                    </span>
                );
            })
        }
        return (
            <div className="box-page">
                {searchResults}
                {Box}
                <br></br>
                <span className="cardlist">
                    {displayCards}
                </span>

            </div >
        );
        
    }
    
}

export default FullBox;