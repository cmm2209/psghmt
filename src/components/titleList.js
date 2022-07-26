import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Latin = document.getElementById("Latin");

const Title = (props) => (
  <tr>
    <td>{props.title.title}</td>
    <td>{props.title.century}</td>
    <td>
      <a href={props.title.url}>{props.title.url}</a>
    </td>
  </tr>
);

export default function TitleList() {
  const [titles, setTitles] = useState([]);
  const [hits, setHits] = useState([]);

  useEffect(() => {
    getTitles();
    return;
  }, [titles.length]); // eslint-disable-line react-hooks/exhaustive-deps

  async function getTitles() {
    const response = await fetch(`http://localhost:5000/browse/`);
    const titles = await response.json();
    setTitles(titles);
  }

  //  useState(() => {
  //    filterer();
  //    return;
  //  }, [titles.length]);

  async function filterer() {
    const res = await fetch(`/get?tongue=Latin`);
    const titles = await res.json();
    setHits(hits);
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
      <button id="Latin" onClick={filterer}>
        Latin
      </button>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Century</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{titleList()}</tbody>
      </table>
    </div>
  );
}
