// src/components/Home.js
import React, { useState, useEffect, useCallback } from "react";
import Results from "./Results";
import Hero from "./Hero";
import axios from "axios";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import ContentRail from "./ContentRail";

export default function Home({ queryParam, results }) {
  const [heroTitles, setHeroTitles] = useState([]);
  const [trendingTitles, setTrendingTitles] = useState([]);

  // function to shuffle Trending titles from API response
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to fetch trending titles
  const fetchTrendingTitles = useCallback(async () => {
    const trendingURL = `${apiEndpoint}/trending/all/week?language=en-US`;
    try {
      const response = await axios.get(trendingURL, getHeaders());
      const fetchedTitles = response.data.results; // Store fetched data in a variable
      setTrendingTitles(fetchedTitles);
      const shuffledTitles = shuffle(fetchedTitles); // Shuffle the fetched data
      const selectedTitles = shuffledTitles.slice(0, 4); // Select 4 random titles
      setHeroTitles(selectedTitles); // Update state with selected titles
      console.log(selectedTitles); // Log the selected titles
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
          <Hero data={heroTitles} />
        )}
        <ContentRail title="Trending" data={trendingTitles} length={12} />
      </main>
    </div>
  );
}
