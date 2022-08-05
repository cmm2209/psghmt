import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
// import Navbar from "./components/navbar"; (include <Navbar /> above <Routes>)
import Landing from "./components/landing";
import TitleList from "./components/titleList";
import Testing from "./components/Testing";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/browse" element={<TitleList />} />
        <Route path="/tfilters" element={<TitleList />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </div>
  );
};

export default App;
