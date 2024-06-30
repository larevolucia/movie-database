import React from "react";
//import { useParams } from "react-router-dom";

function PersonDetails({ mediaType, details }) {
  // const { media_type } = useParams();
  console.log(details);
  return (
    <div>
      <h1>{mediaType === "movie" ? details.title : details.name}</h1>
      <p>{details.known_for_department}</p>
      <p>{details.biography}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
        alt={mediaType === "movie" ? details.title : details.name}
      />
    </div>
  );
}
export default PersonDetails;
