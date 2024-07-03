// src/components/Home.js
import React, { useState, useEffect, useCallback } from "react";
import Results from "./Results";
import Hero from "./Hero";
import axios from "axios";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";

export default function Home({ queryParam, results }) {
  const [trendingTitles, setTrendingTitles] = useState([]);

  // Function to fetch trending titles
  const fetchTrendingTitles = useCallback(async () => {
    const trendingURL = `${apiEndpoint}/trending/all/week?language=en-US`;
    try {
      const response = await axios.get(trendingURL, getHeaders());
      setTrendingTitles(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!queryParam) {
      fetchTrendingTitles();
    }
  }, [queryParam, fetchTrendingTitles]);

  return (
    <div className="Home" data-testid="home">
      <main>
        {queryParam ? (
          <Results data={results} keyword={queryParam} />
        ) : (
          <Hero data={trendingTitles} />
        )}
      </main>
    </div>
  );
}
