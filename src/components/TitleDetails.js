import React from "react";
//import { useParams } from "react-router-dom";

function TitleDetails({ mediaType, details }) {
  // const { media_type } = useParams();

  return (
    <div data-testid="title-details">
      <h1>{mediaType === "movie" ? details.title : details.name}</h1>
      <p>{details.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={mediaType === "movie" ? details.title : details.name}
      />
    </div>
  );
}
export default TitleDetails;
