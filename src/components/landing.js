import React from "react";
 
// We use Route in order to define the different routes of our application
import { Link } from "react-router-dom";
 
// We import all the components we need in our app
// import TitleList from "./titleList.js";
 
const Landing = () => {
 return (
   <div>
     <div className="landing">
        <h1>The Center for the History of Music Theory and Literature</h1>
        <img style={{"width" : 50 + '%'}} alt="bkdg" src="http://chmtl.indiana.edu/images/scriptorium10011101-1024x512k.jpg"></img>
       <p>
       <Link to="/browse">Browse all treatises</Link>
       </p> 
      </div>

   </div>
 );
};
 
export default Landing;