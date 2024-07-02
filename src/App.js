import React from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./About";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:query" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:media_type/:id" element={<Details />} />
        </Routes>
        <footer>Credits go here.</footer>
      </div>
    </div>
  );
}

export default App;
