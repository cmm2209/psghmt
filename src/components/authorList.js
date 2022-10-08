import { React, useEffect, useState } from "react";
import Navbar from "./navbar.js";
import Browsebar from "./browsebar.js";
import FilterCol from "./filtercol.js";
import "../css/browse-style.css";

const Title = (props) => {
  var titlesArr = [];
  for (var i = 0; i < props.title.treatises.length; i++) {
    titlesArr.push(
      <span className="has-hover-card">
        <p>{props.title.treatises[i].title}</p>
        <span className="hover-card">
          {props.title.treatises[i].versions[0] !== undefined && (
            <span>
              <a
                href={props.title.treatises[i].versions[0].url}
                className="source"
              >
                {props.title.treatises[i].versions[0].source}
              </a>
              <br />
            </span>
          )}
          {props.title.treatises[i].versions[1] !== undefined && (
            <span>
              <a
                href={props.title.treatises[i].versions[1].url}
                className="source"
              >
                {props.title.treatises[i].versions[1].source}
              </a>
              <br />
            </span>
          )}
          {props.title.treatises[i].versions[2] !== undefined && (
            <span>
              <a
                href={props.title.treatises[i].versions[2].url}
                className="source"
              >
                {props.title.treatises[i].versions[2].source}
              </a>
              <br />
            </span>
          )}
          {props.title.treatises[i].versions[3] !== undefined && (
            <span>
              <a
                href={props.title.treatises[i].versions[3].url}
                className="source"
              >
                {props.title.treatises[i].versions[3].source}
              </a>
              <br />
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <tr>
      <td>{props.title._id}</td>
      <td>{titlesArr}</td>
    </tr>
  );
};

/**
  {props.title.treatises[i].version1 !== undefined && (
              <span key={props.title.treatises[i].title}>
                {props.title.treatises[i].title}
              </span>
            )}
 */

export default function AuthorList() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getTitles();
    return;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getTitles() {
    const response = await fetch(`https://psghmt.herokuapp.com/authors/`);
    const titles = await response.json();
    setTitles(titles);
    const cblist = document.getElementsByClassName("cb");
    for (const el of cblist) {
      el.checked = false;
    }
  }

  async function submission() {
    var markedCheckbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    var empty = [].filter.call(markedCheckbox, function (el) {
      return !el.checked;
    });
    if (markedCheckbox.length == empty.length) {
      const response = await fetch(`https://psghmt.herokuapp.com/authors/`);
      const titles = await response.json();
      setTitles(titles);
    }
    var cbsum = [];
    for (var checkbox of markedCheckbox) {
      cbsum.push(checkbox.name + "=" + checkbox.value);
      var cbsum1 = cbsum.toString();
      var cbsumWoC = cbsum1.replace(/,/g, "&");
    }
    const res = await fetch(`https://psghmt.herokuapp.com/autfilters?${cbsumWoC}`);
    const titles = await res.json();
    setTitles(titles);
  }

  // This method will map out the records on the table
  function titleList() {
    return titles.map((title) => {
      return <Title title={title} key={title._id} />;
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
          <form id="filterMenu" onChange={submission}>
            <FilterCol />
          </form>
          <button className="button" id="reset" onClick={getTitles}>
            Reset
          </button>
        </div>
        <div className="results">
          <h3 id="result"></h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Authors</th>
                <th>Treatises</th>
              </tr>
            </thead>
            <tbody>{titleList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
