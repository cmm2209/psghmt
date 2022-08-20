import { React, useEffect, useState, Fragment } from "react";
import Navbar from "./navbar.js";
import Browsebar from "./browsebar.js";
import FilterCol from "./filtercol.js";
import "../css/browse-style.css";

const Contributor = (props) => {
  var temp = props.contributor.treatises;
  // console.log({ temp });
  var titlesArr = [];
  for (var titles of props.contributor.treatises) {
    titlesArr.push(titles);
    var titlesArr1 = titlesArr.toString();
    //  var titlesArr2 = titlesArr1.replace(/,/g, ", ");
    var titlesArr2 = titlesArr1.replace(/,https/g, "</a><br /> <a href='https");
    var titlesArr3 = titlesArr2.replace(/,/g, "'>");
    var titlesArr4 = titlesArr3.replace(/^https/, "<a href='http");
    var titlesArr5 = titlesArr4.replace(/$/, "</a>");
    /** 
    var frag = document.createRange().createContextualFragment(titlesArr5);
    console.log(frag);
      */
  }
  // const titlesArr6 = {
  //   testOne: <Fragment>{titlesArr5}</Fragment>};

  return (
    <tr>
      <td>{props.contributor._id}</td>
      <td
        className="Container"
        dangerouslySetInnerHTML={{ __html: titlesArr5 }}
      ></td>
    </tr>
  );
};

export default function ContributorList() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getContributors();
    return;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getContributors() {
    const response = await fetch(`http://localhost:5000/contributors/`);
    const contributors = await response.json();
    setContributors(contributors);
  }

  // This method will map out the records on the table
  function contributorList() {
    return contributors.map((contributor) => {
      return <Contributor contributor={contributor} key={contributor._id} />;
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Navbar />
      <Browsebar />
      <div className="filterNresults">
        <div className="filterbar">
          <h3>Filter by:</h3>
          <button className="button" id="reset" onClick={getContributors}>
            Reset
          </button>
        </div>
        <div className="results">
          <h3 id="result"></h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Treatises</th>
              </tr>
            </thead>
            <tbody>{contributorList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
