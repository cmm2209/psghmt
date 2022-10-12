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
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/incipits">Incipits</Link>
        </li>
        <li>
          <Link to="/contributors">Contributors</Link>
        </li>
      </ul>
    </div>
  );
};

export default Browsebar;
