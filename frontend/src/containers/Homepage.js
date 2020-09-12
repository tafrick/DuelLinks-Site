import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import './Homepage.css';
import Logo from '../components/Logo/Logo';

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import '../components/DeckTypes/Table.css';
import JoeyPic from '../assets/images/joey.jpg';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedBoxes: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get('http://localhost:9000/boxes')
            .then(response => {
                let boxes = [...response.data];
                this.setState({ loadedBoxes: boxes })
                //console.log(boxes);
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    useStyles = () => makeStyles({
        table: {
            minWidth: 650
        }
    });

    render() {
        let boxes = null;
        const classes = this.useStyles();
        if (this.state.loadedBoxes) {
            boxes = (
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontSize: '18px', backgroundColor: '#0B0C10', color: '#66FCF1', }} align="center">Name</TableCell>
                                <TableCell style={{ fontSize: '18px', backgroundColor: '#0B0C10', color: '#66FCF1', }} align="center">Box</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: '#0B0C10', color: '66FCF1', }}>
                            {this.state.loadedBoxes.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell className="table" component="th" scope="row" align="center" style={{ fontSize: '23px', color: 'black', textTransform: "uppercase" }}>
                                        <Link to={'/boxes/' + row._id}>
                                            {row.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{<img src={row.img_src} />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
        return (
            <div className="Homepage">
                <div>
                    <h1>Welcolme to the Duel Links Academy!</h1>
                    <p>A fansite for the popular mobile game, no affiliation with konami</p>
                    <Logo />
                    <ul className="articles">
                        <li>
                            <Link to="/beginners">
                                <div className="beginners-guide">

                                    <img src={JoeyPic} alt="begginners guide" />
                                    <div className="container">
                                        <h4><b>Beginner's Guide</b></h4>
                                    </div>

                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {boxes}
                <div>
                    <h1>Additional Duel Links Content Creators on Youtube:</h1>
                    <ul>
                        <li><a href="https://www.youtube.com/channel/UCz_cNcJzCy4asffzW5ERH1w" target="_blank">Duel Links Meta</a></li>
                        <li><a href="https://www.youtube.com/channel/UCXgNU9GtLPiE2dAYDwIQO6Q" target="_blank">YTDan Duel Links</a></li>
                        <li><a href="https://www.youtube.com/channel/UCGmqsD0yv9B3GGlhGcP5_xA" target="_blank">Playmaker Duel Links</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Homepage;