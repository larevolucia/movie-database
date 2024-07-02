import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Results from "./Results";
import Navigation from "./Navigation";
import Hero from "./Hero";
import axios from "axios";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [trendingTitles, setTrendingTitles] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query");

  const apiEndpoint = "https://api.themoviedb.org/3";
  const headers = useMemo(() => {
    return {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_KEY}`
      }
    };
  }, []);

  const fetchTrendingTitles = useCallback(async () => {
    const trendingURL = `${apiEndpoint}/trending/all/week?language=en-US`;
    try {
      const response = await axios.get(trendingURL, headers);
      setTrendingTitles(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [headers]);

  const fetchResults = useCallback(
    async (searchKeyword) => {
      const queryURL = `${apiEndpoint}/search/multi?query=${searchKeyword}&include_adult=false&language=en-US&page=1`;
      try {
        const response = await axios.get(queryURL, headers);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    [headers]
  );

  useEffect(() => {
    if (queryParam) {
      fetchResults(queryParam);
    } else {
      setSearchResults([]); // Reset search results if no query
      fetchTrendingTitles(); // Fetch trending titles when there is no query
    }
  }, [queryParam, fetchResults, fetchTrendingTitles]);

  return (
    <div className="Home" data-testid="home">
      <Navigation onSearch={setSearchResults} query={queryParam} />
      <main>
        {searchResults.length > 0 ? (
          <Results data={searchResults} keyword={queryParam} />
        ) : (
          <Hero data={trendingTitles} />
        )}
      </main>
    </div>
  );
}
