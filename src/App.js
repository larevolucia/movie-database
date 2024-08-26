// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./About";
import Details from "./components/Details";
import Navigation from "./components/Navigation";
import { apiEndpoint, getHeaders } from "./utils/apiConfig.js";
import axios from "axios";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  // Function to fetch search results
  const fetchResults = useCallback(async (searchKeyword) => {
    if (typeof searchKeyword !== "string") {
      console.error(
        "fetchResults called with non-string argument:",
        searchKeyword
      );
      return;
    }
    const queryURL = `${apiEndpoint}/search/multi?query=${encodeURIComponent(
      searchKeyword
    )}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await axios.get(queryURL, getHeaders());
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (queryParam) {
      fetchResults(queryParam);
    } else {
      setSearchResults([]);
    }
  }, [queryParam, fetchResults]);

  useEffect(() => {
    if (isSearchSubmitted) {
      setIsSearchSubmitted(false);
    }
  }, [searchResults, isSearchSubmitted]);

  const handleFormSubmit = () => {
    setIsSearchSubmitted(true);
  };

  return (
    <div className="App">
      <Navigation
        query={queryParam}
        onSearch={fetchResults}
        onFormSubmit={handleFormSubmit}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home queryParam={queryParam} results={searchResults} />}
          />
          <Route path="/:query" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:mediaType/:id" element={<Details />} />
        </Routes>
        <footer>Powered by <img className="tmdb-logo" alt="The Movie Database" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"/></footer>
      </div>
    </div>
  );
}

export default App;
