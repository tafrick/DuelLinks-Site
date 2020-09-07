import React from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, box) {
  return { name, box };
}

const boxPage = ({ match }) => {
  console.log("boxPage");
  const {
    params: { boxName }
  } = match;

  return (
    <>
      <h2>{boxName.name}</h2>
    </>
  );
};




export default function DenseTable() {
  const classes = useStyles();
  console.log(rows[0].name.replace(" ", "%20"));

  return (
    <>
          <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:'18px', backgroundColor:'#cccccc', color: 'black',}}align="center">Name</TableCell>
                <TableCell style={{fontSize:'18px', backgroundColor:'#cccccc', color: 'black',}}align="center">Box</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{backgroundColor:'#cccccc', color: 'black',}}>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="center" style={{fontSize:'23px', color: 'black',textTransform: "uppercase"}}>
                    {row.name}
                  </TableCell>

                  <TableCell align="center">{<Link to={`/${row.name}`}><img src={row.img_src}/></Link>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Router>
        {rows.map((row) => (
          
          <Route path={`/:${row.name.replace(" ", "%20")}`} component={boxPage} />
        ))}
          
        </Router>
    </>

    
  );
}

//<Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
//<TableCell align="center">{<a href={row.img_src} target="_blank"><img src={row.img_src}/></a>}</TableCell>
