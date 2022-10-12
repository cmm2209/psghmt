import { React } from "react";
import Navbar from "./navbar.js";
import "../css/browse-style.css";

import bells from "../Bells.jpg";
import hucbald from "../Hucbald.jpg";

const About = () => {
  return (
    <div itemScope="itemscope">
      <div className="landing">
        <Navbar />

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

export default About;
