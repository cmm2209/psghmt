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
                <ul className="children">
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/about/mission.html"
                      itemProp="url"
                    >
                      <span itemProp="name">Mission</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/about/history.html"
                      itemProp="url"
                    >
                      <span itemProp="name">History</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/browse">
                  <span itemProp="name">The Database</span>
                </Link>
              </li>
              <li className="has-children">
                <a
                  href="https://chmtl.indiana.edu/projects/index.html"
                  itemProp="url"
                >
                  <span itemProp="name">Other projects and resources</span>
                </a>
                <ul className="children">
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/projects/borrowing.html"
                      itemProp="url"
                    >
                      <span itemProp="name">Musical Borrowing</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/hmt/thesauri/heinrich-isaac/index.html"
                      itemProp="url"
                    >
                      <span itemProp="name">Choralis Constantinus II</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <a
                  href="https://chmtl.indiana.edu/projects/index.html"
                  itemProp="url"
                >
                  <span itemProp="name">Archives</span>
                </a>
                <ul className="children">
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/hmt/publications.html"
                      itemProp="url"
                    >
                      <span itemProp="name">Past Publications</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/projects/ddm-online.html"
                      itemProp="url"
                    >
                      <span itemProp="name">DDM-Online</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chmtl.indiana.edu/projects/collectorship.html"
                      itemProp="url"
                    >
                      <span itemProp="name">Music Collectorship</span>
                    </a>
                  </li>
                </ul>
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
              The Center for the History{" "}
              <span style={{ display: "block" }}>
                of Music Theory and Literature
              </span>
            </Link>
          </h1>
        </div>
      </div>
      <div
        id="nav-main-sticky-wrapper"
        className="sticky-nav is-sticky"
        style={{ height: "52px" }}
      >
        <nav
          aria-label="Main"
          id="nav-main"
          role="navigation"
          itemScope="itemScope"
          itemType="http://schema.org/SiteNavigationElement"
          className="main show-for-large dropdown"
        >
          <ul className="row pad">
            <li className="first">
              <a
                href="https://chmtl.indiana.edu/about/index.html"
                itemProp="url"
              >
                <span itemProp="name">About</span>
              </a>
              <ul className="children">
                <li>
                  <a
                    href="https://chmtl.indiana.edu/about/mission.html"
                    itemProp="url"
                  >
                    <span itemProp="name">Mission</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://chmtl.indiana.edu/about/history.html"
                    itemProp="url"
                  >
                    <span itemProp="name">History</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/browse">
                <span itemProp="name">The Database</span>
              </Link>
            </li>
            <li>
              <a
                href="https://chmtl.indiana.edu/projects/index.html"
                itemProp="url"
              >
                <span itemProp="name">Other projects and resources</span>
              </a>
              <ul className="children">
                <li>
                  <a
                    href="https://chmtl.indiana.edu/projects/borrowing.html"
                    itemProp="url"
                  >
                    <span itemProp="name">Musical Borrowing</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://chmtl.indiana.edu/hmt/thesauri/heinrich-isaac/index.html"
                    itemProp="url"
                  >
                    <span itemProp="name">Choralis Constantinus II</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="https://chmtl.indiana.edu/projects/index.html"
                itemProp="url"
              >
                <span itemProp="name">Archives</span>
              </a>
              <ul className="children">
                <li>
                  <a
                    href="https://chmtl.indiana.edu/hmt/publications.html"
                    itemProp="url"
                  >
                    <span itemProp="name">Past Publications</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://chmtl.indiana.edu/projects/ddm-online.html"
                    itemProp="url"
                  >
                    <span itemProp="name">DDM-Online</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://chmtl.indiana.edu/projects/collectorship.html"
                    itemProp="url"
                  >
                    <span itemProp="name">Music Collectorship</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
