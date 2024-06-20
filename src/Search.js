import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const apiEndpoint = "https://api.themoviedb.org/3/";
  const apiURL = `${apiEndpoint}/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1'`;
  const headers = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDVmNWYzMGYwODU0ZTFjMWY0YjVlMmU0NjhjZjJkOSIsInN1YiI6IjY2NmIyYWViOGVhZTgwNTJhZGNkMjE3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WFYHSyl3xEQzK_-_gCITj93DkugI0KNsIUXugq0dqjs"
    }
  };

  const handleResponse = async (response) => {
    const { results } = response.data;
    setResults(results);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (keyword !== "") {
      try {
        const response = await axios.get(apiURL, headers);
        return handleResponse(response);
      } catch (error) {
        return console.error(error);
      }
    } else {
      alert("Empty search");
    }
  };

  function handleKeywordChange(event) {
    event.preventDefault();
    setKeyword(event.target.value);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit} className="input-group">
        <input
          className="form-control"
          type="text"
          aria-label="Text input with segmented dropdown button"
          onChange={handleKeywordChange}
          placeholder="Search for movie, tv or cast"
          autoComplete="off"
        ></input>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {results && <Results data={results} />}
    </div>
  );
}
