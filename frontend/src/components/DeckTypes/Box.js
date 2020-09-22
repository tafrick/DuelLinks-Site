import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './Table.css';
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

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
        axios.get('http://localhost:9000/decks/' + data[0].name)
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