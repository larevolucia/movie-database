import React from "react";
import "../styles/Results.css";
import TitleList from "./TitleList";
import PersonList from "./PersonList";

export default function Results({ data, keyword }) {
  // Filter movies and TV shows
  const moviesAndTv = data.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
  // Filter persons
  const persons = data.filter((item) => item.media_type === "person");

  return (
    <div>
      <h2 className="results-header">
        Results for: <span className="query">{keyword}</span>{" "}
        {/* Show search keyword */}
      </h2>
      <hr className="hr-header" />
      {moviesAndTv.length !== 0 && <TitleList items={moviesAndTv} />}{" "}
      {persons.length !== 0 && <PersonList items={persons} />}{" "}
      {moviesAndTv.length === 0 && persons.length === 0 && (
        <p>No results found</p>
      )}
    </div>
  );
}
