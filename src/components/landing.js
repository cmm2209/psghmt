import React from "react";
import pyth from "../Pyth.jpg";
import bells from "../Bells.jpg";
import hucbald from "../Hucbald.jpg";
import scriptorium from "../scriptorium.jpg";

// We use Route in order to define the different routes of our application
import { Link } from "react-router-dom";

// We import all the components we need in our app
// import TitleList from "./titleList.js";

import "../css/style.css";
import "../css/icon-font.css";
import "../css/iu-framework.min.css";
import "../css/brand.min.css";
import "../css/search.min.css";
import "../css/site.css";
import "../css/modernizr.min.js";

const Landing = () => {
  return (
    <div
      className="js flexbox flexboxlegacy no-touch no-iumobile webp js flexbox flexboxlegacy no-touch no-iumobile webp has-menu-toggle"
      itemScope="itemscope"
    >
      <link
        as="font"
        crossOrigin=""
        href="https://fonts.iu.edu/fonts/benton-sans-regular.woff"
        rel="preload"
        type="font/woff2"
      />
      <link
        as="font"
        crossOrigin=""
        href="https://fonts.iu.edu/fonts/benton-sans-bold.woff"
        rel="preload"
        type="font/woff2"
      />
      <link rel="preconnect" href="https://fonts.iu.edu" crossOrigin="" />
      <link rel="dns-prefetch" href="https://fonts.iu.edu" />
      <div className="landing">
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
                <li className="show-on-sticky home">
                  <a href="/" aria-label="Home">
                    Home
                  </a>
                </li>
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

        <div className="section optometry-banner" id="banner">
          <div className="row pad">
            <div className="one-half">
              <div
                className="bg-image bleed-left"
                style={{
                  backgroundImage: `url(${scriptorium})`,
                }}
              ></div>
              <div className="optometry-banner--content">
                <h2 className="title" style={{ color: "#fff" }}>
                  Learn about the Center
                </h2>
                <a
                  className="button"
                  href="https://chmtl.indiana.edu/about/index.html"
                >
                  About us
                </a>
              </div>
            </div>
            <div className="one-half">
              <div
                className="bg-image bleed-right"
                style={{
                  backgroundImage: `url(${pyth})`,
                }}
              ></div>
              <div className="optometry-banner--content">
                <h2 className="title" style={{ color: "#fff" }}>
                  Music theory treatises
                </h2>
                <Link className="button" to="/browse">
                  Browse the database
                </Link>
              </div>
            </div>
          </div>
        </div>

        <main className="wide no-section-nav">
          <div className="content-top"></div>
          <div id="main-content">
            <div className="bg-gray section" id="content">
              <div className="row">
                <div className="layout">
                  <div className="float-left two-thirds">
                    <div className="text">
                      <div className="text">
                        <p>
                          The Center for the History of Music Theory and
                          Literature (CHMTL) supports researchers and students
                          studying the history of music theory and historical
                          musicology.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="float-right one-third">
                    <figure
                      className="media image"
                      itemScope="itemScope"
                      itemType="http://schema.org/ImageObject"
                    >
                      <img src={bells} />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-none section">
              <div className="row">
                <div className="layout">
                  <div className="float-right two-thirds">
                    <div className="text">
                      <div className="text" style={{ paddingLeft: "20px" }}>
                        <p>
                          Since its foundation in 1998, the Center has focused
                          on gathering and disseminating historical materials in
                          digital format, for scholarly and pedagogical
                          purposes.
                        </p>
                        <p>
                          Our earliest projects made pioneering use of
                          technology by making music treatises in Latin freely
                          available and searchable, as well as doctoral
                          dissertations in musicology and writings exploring the
                          practice of borrowing in music.
                        </p>
                        <p>
                          In the twenty-first century, the Center continues to
                          support research on historical documents concerning
                          music.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="float-left one-third">
                    <figure
                      className="media image"
                      itemScope="itemScope"
                      itemType="http://schema.org/ImageObject"
                    >
                      <img src={hucbald} />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
