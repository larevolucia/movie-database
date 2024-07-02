import React from "react";
import "../styles/Results.css";
import TitleList from "./TitleList";
import PersonList from "./PersonList";

export default function Results({ data, keyword }) {
  const moviesAndTv = data.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
  const persons = data.filter((item) => item.media_type === "person");

  return (
    <div>
      <h2 className="results-header">
        Results for: <span className="query">{keyword}</span>
      </h2>
      <hr className="hr-header" />
      {moviesAndTv.length !== 0 ? (
        <TitleList items={moviesAndTv} />
      ) : persons.length !== 0 ? (
        <PersonList items={persons} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
