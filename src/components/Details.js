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
        Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_KEY}`
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
