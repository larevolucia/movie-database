import React from "react";
import Headshot from "./Headshot";

export default function Person({ items }) {
  console.log(items);
  return (
    <div className="People">
      <h3 className="results-type">People</h3>
      <hr className="hr-header" />

      <table className="table table-hover table-results">
        <tbody>
          {items.map((item, index) => {
            const {
              name,
              original_name,
              known_for_department,
              profile_path,
              known_for
            } = item; // Deconstructing each item in the data array

            const headshot = `https://image.tmdb.org/t/p/w1280${profile_path}`;
            const altText = `Poster of ${name || original_name}`;
            const knownForTitles = known_for
              ? known_for
                  .map(
                    (item) =>
                      item?.title || item?.original_title || item?.name || ""
                  )
                  .filter((title) => title)
              : [];
            const knownForList = knownForTitles.join(", ");

            return (
              <tr key={index}>
                <td className="table-cell">
                  {profile_path !== null && profile_path !== undefined && (
                    <Headshot imageUrl={headshot} altText={altText} />
                  )}
                </td>
                <td>
                  <h4>{name || original_name}</h4>

                  <p className="table-person-details">
                    <strong>{known_for_department}</strong>
                  </p>
                  {knownForTitles.length > 0 && (
                    <p className="table-person-details">
                      <em>Known for:</em> {knownForList}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
