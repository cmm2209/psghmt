import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  async function afilterer(aquery) {
    const res = await fetch(`http://localhost:5000/tfilters?author=${aquery}`);
    const titles = await res.json();
    setTitles(titles);
  }

  async function tfilterer(tquery) {
    const res = await fetch(`http://localhost:5000/tfilters?tongue=${tquery}`);
    const titles = await res.json();
    setTitles(titles);
  }

  async function cfilterer(cquery) {
    const res = await fetch(`http://localhost:5000/tfilters?century=${cquery}`);
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
      <h5>Author</h5>
      <button
        id="Boethius"
        value="628ebb193f253638f89b518e"
        onClick={(e) => afilterer(e.target.value)}
      >
        Boethius, -524
      </button>
      <br />
      <button
        id="Gaffurius"
        value="628fc6e73f253638f89b5198"
        onClick={(e) => afilterer(e.target.value)}
      >
        Gaffurius, Franchinus, 1451-1522
      </button>
      <h5>Language</h5>
      <button
        id="Latin"
        value="Latin"
        onClick={(e) => tfilterer(e.target.value)}
      >
        Latin
      </button>
      <br />
      <button
        id="Italian"
        value="Italian"
        onClick={(e) => tfilterer(e.target.value)}
      >
        Italian
      </button>
      <h5>Century</h5>
      <button
        id="fifteenthc"
        value="14"
        onClick={(e) => cfilterer(e.target.value)}
      >
        1400-1499 CE
      </button>
      <br />
      <button
        id="sixteenthc"
        value="15"
        onClick={(e) => cfilterer(e.target.value)}
      >
        1500-1599 CE
      </button>
      <p>
        <button id="reset" onClick={getTitles}>
          Reset
        </button>
      </p>
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
