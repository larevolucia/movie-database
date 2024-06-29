import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TitleDetails() {
  const { id, media_type } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU3YmE3YjJmYWNjM2Y2Y2I1MDQ5MjE3MGQ0Yzk5OCIsIm5iZiI6MTcxOTY3MTgyNy41NTkxNjQsInN1YiI6IjY2NmIyYWViOGVhZTgwNTJhZGNkMjE3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eT9gnnL4gzChGPk_rMGS_swq3l4sFNQVQVdY_xXQoJk"
      }
    };
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => setDetails(data));
  }, [id, media_type]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{media_type === "movie" ? details.title : details.name}</h1>
      <p>{details.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={media_type === "movie" ? details.title : details.name}
      />
      {/* Add more details as needed */}
    </div>
  );
}

export default TitleDetails;
