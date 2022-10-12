import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
// import Navbar from "./components/navbar"; (include <Navbar /> above <Routes>)
import Landing from "./components/landing";
import About from "./components/about";
import TitleList from "./components/titleList";
import AuthorList from "./components/authorList";
import IncipitList from "./components/incList";
import ContributorList from "./components/contributorList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/browse" element={<TitleList />} />
        <Route path="/about" element={<About />} />
        <Route path="/tfilters" element={<TitleList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/autfilters" element={<AuthorList />} />
        <Route path="/incipits" element={<IncipitList />} />
        <Route path="/incfilters" element={<IncipitList />} />
        <Route path="/contributors" element={<ContributorList />} />
        <Route path="/contfilters" element={<ContributorList />} />
      </Routes>
    </div>
  );
};

export default App;
