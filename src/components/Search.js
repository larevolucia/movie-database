import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "./useDebounce";

export default function Search({ onSearch, query }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState(query || "");
  const debouncedKeyword = useDebounce(keyword, 500); // Debounce the keyword by 500ms

  const apiEndpoint = "https://api.themoviedb.org/3"; // Fixed the apiEndpoint

  const headers = useMemo(() => {
    return {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_KEY}`
      }
    };
  }, []);

  const handleResponse = useCallback(
    (response) => {
      const { results } = response.data;
      onSearch(results);
    },
    [onSearch]
  );

  const fetchResults = useCallback(
    async (searchKeyword) => {
      const apiURL = `${apiEndpoint}/search/multi?query=${searchKeyword}&include_adult=false&language=en-US&page=1`;
      try {
        const response = await axios.get(apiURL, headers);
        handleResponse(response);
      } catch (error) {
        console.error(error);
      }
    },
    [headers, handleResponse]
  );

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    if (queryParam) {
      setKeyword(queryParam);
      fetchResults(queryParam);
    }
  }, [location.search, fetchResults]);

  useEffect(() => {
    if (debouncedKeyword) {
      navigate(`/?query=${debouncedKeyword}`);
      fetchResults(debouncedKeyword);
    }
  }, [debouncedKeyword, navigate, fetchResults]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword) {
      navigate(`/?query=${keyword}`);
      fetchResults(keyword);
    } else {
      alert("Empty search");
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for movie, tv or cast"
        value={keyword}
        onChange={handleKeywordChange}
        aria-label="Search"
      />
      <button className="btn btn-primary" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
