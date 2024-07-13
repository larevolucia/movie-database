// import React from "react";
import React, { useCallback, useEffect, useState } from "react";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import useWindowSize from "../hooks/useWindowSize";
import ContentRail from "./ContentRail";
import styled from "styled-components";
import DateToYear from "../formatters/DateToYear";
import axios from "axios";

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
  const [recommendations, setRecommendations] = useState([]);
  const formattedVoteAverage = Math.floor(details.vote_average).toFixed(1);

  const formattedOverview = details.overview
    .split("\n\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  const fetchTitles = useCallback(async () => {
    const apiURL = `${apiEndpoint}/${mediaType}/${details.id}/recommendations`;
    try {
      const response = await axios.get(apiURL, getHeaders());
      console.log(response.data);
      setRecommendations(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [details.id, mediaType]);

  console.log(recommendations);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  return (
    <div data-testid="title-details">
      <Header>
        <h1>{mediaType === "movie" ? details.title : details.name}</h1>
        <HeaderInfo>
          <HeaderInfoTag>{mediaType}</HeaderInfoTag>
          <HeaderInfoTag>
            {mediaType !== "movie" ? (
              <React.Fragment>
                <DateToYear fullDate={details.first_air_date} />-
                <DateToYear fullDate={details.last_air_date} />
              </React.Fragment>
            ) : (
              <DateToYear fullDate={details.release_date} />
            )}
          </HeaderInfoTag>
          <HeaderInfoTag>
            {mediaType !== "movie" ? (
              <React.Fragment>
                {details.number_of_seasons} Seasons
              </React.Fragment>
            ) : (
              <React.Fragment>{details.runtime}m</React.Fragment>
            )}
          </HeaderInfoTag>
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
                <strong>Rating:</strong> {formattedVoteAverage}
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
              <strong>Rating:</strong> {formattedVoteAverage}
            </Info>
          </MovieInfo>
        )}
      </Details>
      {
        <ContentRail
          title="Recomendations"
          mediaType={mediaType}
          data={recommendations}
          length={12}
        />
      }
    </div>
  );
}

export default TitleDetails;
