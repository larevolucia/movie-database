import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ onSearch, query }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(query || "");

  const apiEndpoint = "https://api.themoviedb.org/3"; // Fixed the apiEndpoint

  const headers = useMemo(() => {
    return {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDVmNWYzMGYwODU0ZTFjMWY0YjVlMmU0NjhjZjJkOSIsInN1YiI6IjY2NmIyYWViOGVhZTgwNTJhZGNkMjE3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFYHSyl3xEQzK_-_gCITj93DkugI0KNsIUXugq0dqjs"
      }
    };
  }, []);

  const handleResponse = useCallback(
    async (response) => {
      const { results } = response.data;
      onSearch(results);
    },
    [onSearch]
  );

  const fetchResults = useCallback(
    async (searchKeyword) => {
      const apiURL = `${apiEndpoint}/search/multi?query=${searchKeyword}&include_adult=false&language=en-US&page=1`; // Fixed the apiURL and use searchKeyword
      try {
        const response = await axios.get(apiURL, headers);
        return handleResponse(response);
      } catch (error) {
        return console.error(error);
      }
    },
    [headers, handleResponse]
  );

  useEffect(() => {
    if (query) {
      fetchResults(query); // Ensure fetchResults is called correctly
    }
  }, [query, fetchResults]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (keyword !== "") {
      navigate(`/${keyword}`);
      fetchResults(keyword); // Call fetchResults on form submission
    } else {
      alert("Empty search");
    }
  };

  function handleKeywordChange(event) {
    event.preventDefault();
    setKeyword(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for movie, tv or cast"
        value={keyword} // Bind input value to keyword
        onChange={handleKeywordChange}
        aria-label="Search"
      />
      <button className="btn btn-primary" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
