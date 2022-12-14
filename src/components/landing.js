import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./navbar.js";
import "../css/style.css";
import "../css/icon-font.css";
import "../css/iu-framework.min.css";
import "../css/brand.min.css";
import "../css/search.min.css";
import "../css/site.css";
import "../css/modernizr.min.js";

import pyth from "../Pyth.jpg";
import bells from "../Bells.jpg";
import hucbald from "../Hucbald.jpg";
import scriptorium from "../scriptorium.jpg";

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
                  Learn about the Project
                </h2>
                <Link className="button" to="/about">
                  About us
                </Link>
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
                          Primary Sources in Global Histories of Music Theory
                          supports researchers and students studying histories
                          of music theory from around the world.
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
                      <img src={bells} alt="bells" />
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
                        <p>Information about the project.</p>
                        <p>More information.</p>
                        <p>And still more.</p>
                      </div>
                    </div>
                  </div>

                  <div className="float-left one-third">
                    <figure
                      className="media image"
                      itemScope="itemScope"
                      itemType="http://schema.org/ImageObject"
                    >
                      <img src={hucbald} alt="hucbald" />
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
