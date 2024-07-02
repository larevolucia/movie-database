import React from "react";
import { useNavigate } from "react-router-dom";
import Poster from "./Poster";
import DateToYear from "./DateToYear";

export default function TitleList({ items }) {
  const navigate = useNavigate();

  const handleRowClick = (mediaType, id) => {
    navigate(`/details/${mediaType}/${id}`);
  };

  return (
    <div className="Titles">
      <h3 className="results-type">Titles</h3>
      <hr className="hr-header" />
      <table className="table table-hover">
        <tbody>
          {items.map((item, index) => {
            const {
              id,
              media_type,
              name,
              title,
              poster_path,
              overview,
              release_date,
              first_air_date
            } = item;

            const poster = `https://image.tmdb.org/t/p/w1280${poster_path}`;
            const altText = `Poster of ${name || title}`;

            return (
              <tr key={index} onClick={() => handleRowClick(media_type, id)}>
                <td className="image-cell">
                  {poster_path && (
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
                    {overview.length > 150
                      ? `${overview.substring(0, 150)}...`
                      : overview}
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
