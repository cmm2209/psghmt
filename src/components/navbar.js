import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header id="header">
      <div id="skipnav">
        <ul>
          <li>
            <a href="#content">Skip to Content</a>
          </li>
          <li>
            <a href="#nav-main">Skip to Main Navigation</a>
          </li>
        </ul>
        <hr />
      </div>
      <div
        id="offCanvas"
        className="hide-for-large"
        role="navigation"
        aria-label="Mobile"
      >
        <button
          className="menu-toggle button hide-for-large"
          data-toggle="iu-menu"
        >
          Menu
        </button>
        <div
          id="iu-menu"
          className="off-canvas position-right off-canvas-items"
          data-off-canvas=""
          data-position="right"
        >
          <div
            className="mobile off-canvas-list"
            itemScope="itemScope"
            itemType="http://schema.org/SiteNavigationElement"
          >
            <ul>
              <li className="has-children">
                <a
                  href="https://chmtl.indiana.edu/about/index.html"
                  itemProp="url"
                >
                  <span itemProp="name">About</span>
                </a>
              </li>
              <li>
                <Link to="/browse">
                  <span itemProp="name">The Database</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="site-header"
        itemScope="itemScope"
        itemType="http://schema.org/CollegeOrUniversity"
      >
        <div className="row pad">
          <h1>
            <Link to="/" className="title" itemProp="department">
              Primary Sources in Global{" "}
              <span style={{ display: "block" }}>
                Histories of Music Theory
              </span>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
