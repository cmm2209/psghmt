import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Latin = document.getElementById("Latin");

const Title = (props) => (
  <tr>
    <td>
      <a href={props.title.url}>{props.title.title}</a>
    </td>
  </tr>
);

export default function TitleList() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getTitles();
    return;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getTitles() {
    const response = await fetch(`http://localhost:5000/browse/`);
    const titles = await response.json();
    setTitles(titles);
  }

  async function tfilterer(tquery) {
    const res = await fetch(`http://localhost:5000/${tquery}`);
    const titles = await res.json();
    setTitles(titles);
  }

  async function cfilterer(cquery) {
    const res = await fetch(`http://localhost:5000/${cquery}`);
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
      <h2>
        <Link to="/">
          The Center for the History of Music Theory and Literature
        </Link>
      </h2>
      <h3>Treatises</h3>
      <h4>Filter by</h4>
      <button
        id="Latin"
        value="latin"
        onClick={(e) => tfilterer(e.target.value)}
      >
        Latin
      </button>
      <button
        id="sixteenthc"
        value="sixteenthc"
        onClick={(e) => cfilterer(e.target.value)}
      >
        1500-1599 CE
      </button>
      <button id="reset" onClick={getTitles}>
        Reset
      </button>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>{titleList()}</tbody>
      </table>
    </div>
  );
}
