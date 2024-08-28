import React, { useEffect, useState } from "react";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import useWindowSize from "../hooks/useWindowSize";
// import ContentRail from "./ContentRail";
import TileRail from "./TileRail";
import PeopleRail from "./PeopleRail";
import styled from "styled-components";
import DateToYear from "../formatters/DateToYear";
import GroupPeople from "../formatters/GroupPeople";
import Poster from "./Poster";
import imgNotFound from "../img/img_not_found.svg"
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

const Tagline = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
    font-size: 18px;


   @media (min-width: 900px) {
  font-size: 20px;
  }
`

function TitleDetails({ mediaType, details }) {
  const windowSize = useWindowSize();
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const groupedCrew = GroupPeople(crew)
   console.log(details)
  const isFallback = !details.poster_path;
  const poster = details.poster_path === null ? imgNotFound : `https://image.tmdb.org/t/p/w500${details.poster_path}`

  useEffect(() => {
    if (!details) return; // Avoid proceeding if details are not defined

    const fetchTitles = async () => {
      const apiURL = `${apiEndpoint}/${mediaType}/${details.id}/recommendations`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        const formattedRecommendations = response.data.results.map((item) => ({
          id: item.id,
          name: item.name || item.title,
          media_type: item.media_type,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
        }));
        setRecommendations(formattedRecommendations);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCastCrew = async () => {
      const apiURL = `${apiEndpoint}/${mediaType}/${details.id}/credits`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        setCast(
          response.data.cast.map((item) => ({
            id: item.id,
            name: item.name,
            character: item.character,
            profile_path: item.profile_path,
          }))
        );
        setCrew(
          response.data.crew.map((item) => ({
            id: item.id,
            department: item.department,
            name: item.name,
            profile_path: item.profile_path,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTitles();
    fetchCastCrew();
  }, [details, mediaType]);

  if (!details) return <div>Loading...</div>;

  const formattedVoteAverage =  `${Math.round(details.vote_average * 10)}%`

  const formattedOverview = details.overview
    ? details.overview.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))
    : "No overview available."; // Fallback if overview is undefined

  return (
    <div data-testid="title-details">
      <Header>
        <h1>{mediaType === "movie" ? details.title : details.name}</h1>
        <HeaderInfo>
          <HeaderInfoTag>{mediaType}</HeaderInfoTag>
          <HeaderInfoTag>
              {mediaType !== "movie" ? (
                <>
                  <DateToYear fullDate={details.first_air_date} />-
                  <DateToYear fullDate={details.last_air_date} />
                </>
              ) : (
                details.release_date === "" ? details.status : (
                  <DateToYear fullDate={details.release_date} />
                )
              )}
          </HeaderInfoTag>
          {mediaType !== "movie" ? (
            <HeaderInfoTag>{details.number_of_seasons} Seasons</HeaderInfoTag>
          ) : (
            <HeaderInfoTag>{details.runtime}m</HeaderInfoTag>
          )}
        </HeaderInfo>
      </Header>
      <Details>
        <div>
          <Poster
            imageurl={poster}
            altText={mediaType === "movie" ? details.title : details.name}
            isFallback={isFallback}
          />
          {windowSize.width <= 600 && (
            <MovieInfo>
              {details.genres && (
                <Info>
                  <strong>Genres:</strong>{" "}
                  {details.genres.map((genre) => genre.name).join(", ")}
                </Info>
              )}
              <Info>
                <strong>Rating:</strong> {formattedVoteAverage}
              </Info>
            </MovieInfo>
          )}
        </div>
        <Synopsis>{!details.tagline ? null : <Tagline>{details.tagline}</Tagline>}
        {formattedOverview}</Synopsis>
        {windowSize.width > 600 && (
          <MovieInfo>
            {details.genres && (
              <Info>
                <strong>Genres:</strong>{" "}
                {details.genres.map((genre) => genre.name).join(", ")}
              </Info>
            )}
            <Info>
              <strong>Rating:</strong> {formattedVoteAverage}
            </Info>
          </MovieInfo>
        )}
      </Details>
      <PeopleRail title="Cast" data={cast} length={12} />
      <PeopleRail title="Crew" data={groupedCrew} length={12} />
      {recommendations.length > 0 && (
        <TileRail
          title="Recommendations"
          pageType={mediaType}
          data={recommendations}
          length={12}
        />

      )}
    </div>
  );
}

export default TitleDetails;
