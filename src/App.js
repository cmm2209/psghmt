import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
// import Navbar from "./components/navbar"; (include <Navbar /> above <Routes>)
import Landing from "./components/landing";
import TitleList from "./components/titleList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/browse" element={<TitleList />} />
        <Route path="/tongue" element={<TitleList />} />
        <Route path="/century" element={<TitleList />} />
      </Routes>
    </div>
  );
};

export default App;
