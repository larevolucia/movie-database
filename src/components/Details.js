import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleDetails from "./TitleDetails";
import PersonDetails from "./PersonDetails";

function Details() {
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
      {media_type === "movie" || media_type === "tv" ? (
        <TitleDetails id={id} mediaType={media_type} details={details} />
      ) : (
        <PersonDetails id={id} mediaType={media_type} details={details} />
      )}
    </div>
  );
}

export default Details;
