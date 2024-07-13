import React from "react";
// import React, { useCallback, useEffect, useState } from "react";
// import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import useWindowSize from "../hooks/useWindowSize";
// import ContentRail from "./ContentRail";
import styled from "styled-components";
import DateToYear from "../formatters/DateToYear";
// import axios from "axios";

const HeaderInfo = styled.ul`
    align-items: center;
    display: inline-flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
}`;

const HeaderInfoTag = styled.li`
    padding: 0 0.5rem;
}`;

const Header = styled.div`
  padding: 10px 5px;
`;

const Poster = styled.img`
  height: auto;
  max-width: 200px;

  @media (min-width: 900px) {
    height: auto;
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  display: inline-grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 2fr;

  @media (min-width: 900px) {
    grid-template-columns: 0.5fr 2fr 1fr;
  }
`;

const Synopsis = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const MovieInfo = styled.div`
  padding: 0.5rem;
`;

const Info = styled.p`
  margin-top: 0.5em;
`;

function TitleDetails({ mediaType, details }) {
  console.log(details);
  const windowSize = useWindowSize();
  const roundedVoteAverage = Math.round(details.vote_average).toFixed(1);
  console.log(details.vote_average);

  const formattedOverview = details.overview
    .split("\n\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <div data-testid="title-details">
      <Header>
        <h1>{mediaType === "movie" ? details.title : details.name}</h1>
        <HeaderInfo>
          <HeaderInfoTag>{mediaType}</HeaderInfoTag>
          <HeaderInfoTag>
            <DateToYear fullDate={details.release_date} />
          </HeaderInfoTag>
          <HeaderInfoTag>{details.runtime}m</HeaderInfoTag>
        </HeaderInfo>
      </Header>
      <Details>
        <div>
          <Poster
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={mediaType === "movie" ? details.title : details.name}
          />
          {windowSize.width <= 600 && (
            <MovieInfo>
              {details.genres !== undefined ? (
                <Info>
                  <strong>Genres:</strong>{" "}
                  {details.genres.map((genre) => genre.name).join(", ")}
                </Info>
              ) : null}
              <Info>
                <strong>Rating:</strong> {roundedVoteAverage}
              </Info>
            </MovieInfo>
          )}
        </div>
        <Synopsis>{formattedOverview}</Synopsis>
        {windowSize.width > 600 && (
          <MovieInfo>
            {details.genres !== undefined ? (
              <Info>
                <strong>Genres:</strong>{" "}
                {details.genres.map((genre) => genre.name).join(", ")}
              </Info>
            ) : null}
            <Info>
              <strong>Rating:</strong> {roundedVoteAverage}
            </Info>
          </MovieInfo>
        )}
      </Details>
    </div>
  );
}

export default TitleDetails;
