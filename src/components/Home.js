import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Results from "./Results";
import Navigation from "./Navigation";
import Carousel from "./Carousel";
import axios from "axios";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query");

  const fetchResults = useCallback(async (searchKeyword) => {
    const apiEndpoint = "https://api.themoviedb.org/3";
    const apiURL = `${apiEndpoint}/search/multi?query=${searchKeyword}&include_adult=false&language=en-US&page=1`;
    const headers = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_KEY}`
      }
    };
    try {
      const response = await axios.get(apiURL, headers);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (queryParam) {
      fetchResults(queryParam);
    } else {
      setSearchResults([]); // Reset search results if no query
    }
  }, [queryParam, fetchResults]);

  return (
    <div className="Home" data-testid="home">
      <Navigation onSearch={setSearchResults} query={queryParam} />
      <main>
        {searchResults.length > 0 ? (
          <Results data={searchResults} keyword={queryParam} />
        ) : (
          <Carousel />
        )}
      </main>
    </div>
  );
}
