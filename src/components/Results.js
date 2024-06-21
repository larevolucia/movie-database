import React from "react";
import "../styles/Results.css";
import Title from "./Title";
import Person from "./Person";

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
      <Title items={moviesAndTv} />
      <Person items={persons} />
    </div>
  );
}
