// src/components/Search.js
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
//import useDebounce from "../hooks/useDebounce";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import axios from "axios";

export default function Search({ onSearch, query, onFormSubmit }) {
  const navigate = useNavigate();
  // const location = useLocation();
  const [keyword, setKeyword] = useState(query || "");
  //const debouncedKeyword = useDebounce(keyword, 500);

  const handleResponse = useCallback(
    (response) => {
      const { results } = response.data;
      onSearch(results);
    },
    [onSearch]
  );

  const fetchResults = useCallback(
    async (searchKeyword) => {
      if (typeof searchKeyword !== "string") {
        console.error(
          "fetchResults called with non-string argument:",
          searchKeyword
        );
        return;
      }
      const apiURL = `${apiEndpoint}/search/multi?query=${encodeURIComponent(
        searchKeyword
      )}&include_adult=false&language=en-US&page=1`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        handleResponse(response);
      } catch (error) {
        console.error(error);
      }
    },
    [handleResponse]
  );

  // useEffect(() => {
  //   const queryParam = new URLSearchParams(location.search).get("query");
  //   if (queryParam) {
  //     setKeyword(queryParam);
  //     fetchResults(queryParam);
  //   }
  // }, [location.search, fetchResults]);

  // useEffect(() => {
  //   if (keyword) {
  //     navigate(`/?query=${keyword}`);
  //     fetchResults(keyword);
  //   }
  // }, [keyword, navigate, fetchResults]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword) {
      navigate(`/?query=${keyword}`);
      fetchResults(keyword);
      onFormSubmit();
    } else {
      alert("Empty search");
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex"
      role="search"
      data-testid="search-form"
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for movie, tv or cast"
        value={keyword}
        onChange={handleKeywordChange}
        aria-label="Search"
      />
      <button
        className="btn btn-primary"
        type="submit"
        data-testid="search-submit"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
