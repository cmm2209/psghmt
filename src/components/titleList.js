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
    const cblist = document.getElementsByClassName("cb");
    for (const el of cblist) {
      el.checked = false;
    }
  }

  async function submission() {
    var markedCheckbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    var cbsum = [];
    for (var checkbox of markedCheckbox) {
      cbsum.push(checkbox.name + "=" + checkbox.value);
      var cbsum1 = cbsum.toString();
      var cbsumWoC = cbsum1.replace(",", "&");
      const res = await fetch(`http://localhost:5000/tfilters?${cbsumWoC}`);
      const titles = await res.json();
      setTitles(titles);
    }
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
      <form id="filterMenu" onChange={submission}>
        <h5>Language</h5>
        <input
          type="checkbox"
          id="Latin"
          name="tongue"
          className="cb"
          value="Latin"
        />
        <label htmlFor="Latin">Latin</label>
        <br />
        <input
          type="checkbox"
          id="Italian"
          name="tongue"
          className="cb"
          value="Italian"
        />
        <label htmlFor="Italian">Italian</label>
        <h5>Century</h5>
        <input
          type="checkbox"
          id="fifteenthc"
          name="century"
          className="cb"
          value="14"
        />
        <label htmlFor="fifteenthc">1400-1499</label>
        <br />
        <input
          type="checkbox"
          id="sixteenthc"
          name="century"
          className="cb"
          value="15"
        />
        <label htmlFor="sixteenthc">1500-1599</label>
        <br />
        <br />
      </form>
      <button id="reset" onClick={getTitles}>
        Reset
      </button>
      <h3 id="result"></h3>
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
