import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../components/DeckTypes/Table.css';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import './Boxes.css';

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedBoxes: [],
            searchResult: [],
            displaySearch: false,
            displayDefault: true
        };
    }

    componentDidMount() {
        this.loadData();
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
                displaySearch: true
            });
            this.loadResult(this.state.text);
        }
    }

    loadData() {
        axios.get('https://duellinksacademy.xyz/api/boxes')
            .then(response => {
                let boxes = [...response.data];
                this.setState({ loadedBoxes: boxes })
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    loadResult(text) {
        this.setState({ searchResult: [] });
        let searchResultArr = [];
        for (let i = 0; i < this.state.loadedBoxes.length; i++) {
            if (this.state.loadedBoxes[i].name.toLowerCase().includes(text.toLowerCase())) {
                searchResultArr.push(this.state.loadedBoxes[i]);
            }
        }
        this.setState({
            searchResult: searchResultArr,
            displaySearch: true,
            displayDefault: false
        })
    }
    validate(text) {
        let box = ["Arena of Sanctuary", "Fortress of Gears", "Spirit Of The Beast", "Soul Of Resurrection", "Chronicle of Glory", "Flames of the Heart", "Lords Of Shining", "Secrets Of The Ancients", "Masters of Shadow", "Clash Of Wings", "Curse Of Dread", "Dimension Of The Wizards", "Power Of Bravery", "Guardians Of Rock", "Visions Of Ice", "Resonance Of Contrast", "Servants Of Kings", "Empire Of Scarlet", "Blades Of Spirits", "Tornado Of Phantoms", "Rampage Of The Forest", "Dawn Of Destiny", "Flame Of The Tyrant", "Echoes Of Silence", "Wonders Of The Sky", "Age Of Discovery", "Land of the Titans"]
        const mini = box.some(name => text.toLowerCase() === name.toLowerCase());
        return mini;
    }

    render() {
        let search = "";
        let main = "";
        let mini = "";
        let sd = "";
        search = (
            <div className="search-container">
                <form onSubmit={this.handleClick}>
                    <label>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="Search box name..." />
                        <Button variant="contained" color="primary" onClick={this.handleClick}><SearchIcon /></Button>
                    </label>
                </form>
                <br></br>
                <div className="search-results">
                    {this.state.searchResult.map(row => {
                        return (<Link to={'/boxes/' + row._id}><img src={row.img_src} alt={row.name} /></Link>)
                    }
                    )}
                </div>
            </div>
        );
        if (this.state.loadedBoxes && this.state.displayDefault) {
            main = (
                <div className="main-format">
                    <h2>Main Boxes</h2>
                    <hr />
                    {this.state.loadedBoxes.map(row => {
                        return (row.name.includes("SD") ? "" : this.validate(row.name) ? "" : <li><Link to={'/boxes/' + row._id}> <img src={row.img_src} alt={row.name} /></Link></li>)
                    })}
                </div>
            );
            mini = (
                <div className="main-format">
                    <h2>Mini Boxes</h2>
                    <hr />
                    {this.state.loadedBoxes.map(row => {
                        return (this.validate(row.name) ? <li><Link to={'/boxes/' + row._id}> <img src={row.img_src} alt={row.name} /> </Link></li> : '')
                    })}
                </div>
            );
            sd = (
                <div className="sd-format">
                    <h2>Structure Decks</h2>
                    <hr />
                    {this.state.loadedBoxes.map(row => {
                        return (row.name.includes("SD") ? <li><Link to={'/boxes/' + row._id}><img src={row.img_src} alt={row.name} /> </Link></li> : '');
                    })}
                </div>
            )
        }
        return (
            <div className="boxes-container">
                {search}
                <section className="box-list">
                    <ul>{main}</ul>
                </section>
                <section className="box-list">
                    <ul>{mini}</ul>
                </section>
                <section className="box-list">
                    <ul>{sd}</ul>
                </section>
            </div>
        );
    }
}

export default Boxes;

