import React from "react";
import "./styles/Results.css";
import Poster from "./Poster";

export default function Results({ data }) {
  console.log(data);
  if (data.length === 0) {
    return null;
  }
  // const { media_type, name, title, poster_path, overview } = data[0];

  //  const poster = `https://image.tmdb.org/t/p/w1280${poster_path}`;
  //  const altText = `Poster of ${name}`;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // const truncatedOverview = truncateText(overview, 235);

  return (
    <div className="Results">
      {data.slice(0, 10).map((item, index) => {
        const { media_type, name, title, poster_path, overview } = item; // Deconstructing each item in the data array

        const poster = `https://image.tmdb.org/t/p/w1280${poster_path}`;
        const altText = `Poster of ${name || title}`;
        const truncatedOverview = truncateText(overview, 195); // Change 100 to your desired character limit

        return (
          <div key={index} className="content-card">
            <div className={media_type}>{media_type}</div>
            <h2>{name || title}</h2>
            {poster_path !== null && poster_path !== undefined && (
              <Poster imageUrl={poster} altText={altText} />
            )}
            <p className="content-description">{truncatedOverview}</p>
          </div>
        );
      })}
    </div>
  );
}
