// src/components/Home.js
import React, { useState, useEffect, useCallback } from "react";
import Results from "./Results";
import Hero from "./Hero";
import axios from "axios";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import ContentRail from "./ContentRail";
import TileRail from "./TileRail"; 


export default function Home({ queryParam, results }) {
  const [trendingTitles, setTrendingTitles] = useState([]);
  const [nowPlayingTitles, setNowPlayingTitles] = useState([]);
  const [popularTVTitles, setPopularTVTitles] = useState([]);

  // function to shuffle Trending titles from API response
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to fetch trending movie titles
  const fetchTrendingTitles = useCallback(async () => {
    const trendingURL = `${apiEndpoint}/trending/all/week?language=en-US`;
    try {
      const response = await axios.get(trendingURL, getHeaders());
      const fetchedTitles = response.data.results; // Store fetched data in a variable
      const selectedTitles = shuffle(fetchedTitles).slice(0, 8); // Select 4 random titles
      setTrendingTitles(selectedTitles);
    } catch (error) {
      console.error(error);
    }
  }, []);

    // Function to fetch now playing movie titles
    const fetchNowPlayingTitles = useCallback(async () => {
      const nowPlayingURL = `${apiEndpoint}/movie/now_playing?language=en-US&page=1`;
      try {
        const response = await axios.get(nowPlayingURL, getHeaders());
        const fetchedNowPlayingTitles = response.data.results.map((item) => ({
          ...item,
          media_type: "movie", // Default or from API
        }));
        setNowPlayingTitles(fetchedNowPlayingTitles); // Store the first 12 items
      } catch (error) {
        console.error(error);
      }
    }, []);

    
      // Function to fetch popular movie titles
      const fetchPopularTVTitles = useCallback(async () => {
        const popularTVURL = `${apiEndpoint}/tv/popular?language=en-US&page=1`;
        try {
          const response = await axios.get(popularTVURL, getHeaders());
          const fetchedPopularTVTitles = response.data.results.map((item) => ({
            ...item,
            media_type: "tv", 
          }));;
          setPopularTVTitles(fetchedPopularTVTitles); // Store the first 12 items
          console.log(fetchedPopularTVTitles)
        } catch (error) {
          console.error(error);
        }
      }, []);

  useEffect(() => {
    if (!queryParam) {
      fetchTrendingTitles();
      fetchNowPlayingTitles(); 
      fetchPopularTVTitles();
    }
  }, [queryParam, fetchTrendingTitles, fetchNowPlayingTitles, fetchPopularTVTitles]);

  return (
    <div className="Home" data-testid="home">
      <main>
        {queryParam ? (
          <Results data={results} keyword={queryParam} />
        ) : (
          <Hero data={trendingTitles} />
        )}
        <ContentRail title="On Theaters" data={nowPlayingTitles} length={12} pageType="home" /> 
        <TileRail title="Popular TV" data={popularTVTitles} length={12} pageType="home" /> 
      </main>
    </div>
  );
}
