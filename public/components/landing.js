import React from "react";
import pyth from "../Pyth.jpg";
import bells from "../Bells.jpg";
import hucbald from "../Hucbald.jpg";
import scriptorium from "../scriptorium.jpg";

// We use Route in order to define the different routes of our application
import { Link } from "react-router-dom";

// We import all the components we need in our app
// import TitleList from "./titleList.js";

import Navbar from "./navbar.js";

import "../css/style.css";
import "../css/icon-font.css";
import "../css/iu-framework.min.css";
import "../css/brand.min.css";
import "../css/search.min.css";
import "../css/site.css";
import "../css/modernizr.min.js";

const Landing = () => {
  return (
    <div itemScope="itemscope">
      <div className="landing">
        <Navbar />

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
