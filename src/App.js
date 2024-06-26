import "./styles/App.css";
//import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
//import About from "./About";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Home />
        <footer>Credits go here.</footer>
      </div>
    </div>
  );
}

export default App;
