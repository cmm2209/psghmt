import React from "react";

import { Link } from "react-router-dom";

import "../css/site.css";

const Browsebar = () => {
  return (
    <div className="browsebar">
      <ul>
        <li>
          <Link to="/browse">Treatises</Link>
        </li>
        <li>
          <Link to="/browse">Authors</Link>
        </li>
        <li>
          <Link to="/browse">Incipits</Link>
        </li>
        <li>
          <Link to="/browse">Contributors</Link>
        </li>
        <li>
          <Link to="/browse">Concordances</Link>
        </li>
        <li>
          <a href="https://chmtl.indiana.edu/tml/quaero" itemProp="url">
            Search
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Browsebar;
