import React from "react";
import Poster from "./Poster";
import DateToYear from "./DateToYear";

export default function Title({ items }) {
  console.log(items);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="Titles">
      <h3 className="results-type">Titles</h3>
      <hr className="hr-header" />
      <table className="table table-hover">
        <tbody>
          {items.map((item, index) => {
            const {
              media_type,
              name,
              title,
              poster_path,
              overview,
              release_date,
              first_air_date
            } = item; // Deconstructing each item in the data array

            const poster = `https://image.tmdb.org/t/p/w1280${poster_path}`;
            const altText = `Poster of ${name || title}`;

            return (
              <tr key={index}>
                <td className="image-cell">
                  {poster_path !== null && poster_path !== undefined && (
                    <Poster imageUrl={poster} altText={altText} />
                  )}
                </td>
                <td>
                  <span className={media_type}>{media_type}</span>
                  <h4>
                    {name || title}{" "}
                    <span className="table-release-date">
                      <DateToYear fullDate={release_date || first_air_date} />
                    </span>
                  </h4>

                  <p className="content-description">
                    {truncateText(overview, 150)}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
