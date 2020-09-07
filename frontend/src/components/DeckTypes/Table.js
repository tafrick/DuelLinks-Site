import React from "react";
import './Table.css';
import { Grid, Image } from 'semantic-ui-react'

const data = require("./data");
const tmp = require("../../containers/CardLookup/yugioh-boxes-updated.json");
const boxes = require("../../containers/CardLookup/finalUpdatedBoxes.json");


const getData = () => {
  let test = [];
  for (let i = 0; i < boxes.length; i++) {
    // test.push({
    //   "name": boxes[i].name,
    //   "img" : boxes[i].img_src
    // });
    test.push(boxes[i]);
    
  }
  return test;
}


const listItems = boxes.map((d) => 
<div className="banner-container">
  <div className="row">
    <div className = "col" key={d.name}>
      <h2>{d.name}</h2>
      <a href={d.img_src} target="_blank"><img src={d.img_src}/></a>
      {/* <ul key={d.name}>
        {<a href={d.img_src} target="_blank"><img src={d.img_src}/></a>}
      </ul> */}
    </div>
  </div>
</div>
);


const printImage = () => {
  const target = getData();
  return(
    <div>
      <a href={target.img_src} target="_blank"><img src={target.img_src}/></a>
    </div>
  )
}

const Table = () => {
    const dataImport = tmp;
    // console.log("aasas" + tmp[0]);
    // getData();

    function renderHeaderCells() {
      let headerCells = [];

      Object.keys(boxes).map((x, i) => {
        let items = Object.values(boxes[i].name);
        headerCells.push(
          <th colSpan={Object.keys(items).length} key={i.name}>
            {x}
          </th>
        );
        return headerCells;
      });
      return headerCells;
    }

    function updatedHeader(){
      return(
        <div>
          <p>{renderHeaderCells()}</p>
        </div>
      );
      // let updated = [];
      // Object.keys(dataImport).map((x, i) => {
      //   let items = Object.values(dataImport)[i];
      //   updated.push(
      //     <th colSpan={Object.keys(items).length} key={i.name}>
      //       {x}
      //     </th>
      //   );
      //   return updated;
      // });
      // return updated;

    }
    
    
    function renderSubHeaders() {
      // let subHeaders = [];
      // let subs = Object.values(dataImport);

      // subs.map((x, i) => {
      //   if (subs[i] !== undefined) {
      //     Object.keys(subs[i]).map(y => {
      //       subHeaders.push(<td>{y}</td>);
      //       return subHeaders;
      //     });
      //   }
      //   return subHeaders;
      // });
      // return subHeaders;
    }

    function renderResults() {
      let results = [];
      let res = Object.values(dataImport);

      res.map((x, i) => {
        if (res[i] !== undefined) {
          Object.values(res[i]).map(y => {
            results.push(<td>{y}</td>);
            return results;
          });
        }
        return results;
      });

      return results;
    }

    return (
      <React.Fragment>

        {/* {printImage()} */}
        {listItems}
        <table>
          <thead>
            {/* <tr>{renderHeaderCells()}</tr> */}
            {/* <tr>{updatedHeader()}</tr> */}
          </thead>
          <tbody>
            {/* <tr>{renderSubHeaders()}</tr> */}
            {/* <tr>{renderResults()}</tr> */}
          </tbody>
        </table>
      </React.Fragment>
    );
};

export default Table;
