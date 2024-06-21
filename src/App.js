import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
//import Results from "./components/Results";
import About from "./About";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:query" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>Credits go here.</footer>
      </div>
    </div>
  );
}

export default App;
