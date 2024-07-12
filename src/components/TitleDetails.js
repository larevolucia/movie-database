import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 300px;
    height: auto;
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Overview = styled.p`
  font-size: 1rem;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Info = styled.div`
  margin: 10px 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

function TitleDetails({ mediaType, details }) {
  console.log(details);

  return (
    <Container data-testid="title-details">
      <Poster
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={mediaType === "movie" ? details.title : details.name}
      />
      <Details>
        <Title>{mediaType === "movie" ? details.title : details.name}</Title>
        <Info>
          <InfoLabel>Release Date:</InfoLabel> {details.release_date}
        </Info>
        {details.genres !== undefined ? (
          <Info>
            <InfoLabel>Genres:</InfoLabel>{" "}
            {details.genres.map((genre) => genre.name).join(", ")}
          </Info>
        ) : null}
        <Info>
          <InfoLabel>Rating:</InfoLabel> {details.vote_average}
        </Info>
        <Overview>{details.overview}</Overview>
      </Details>
    </Container>
  );
}

export default TitleDetails;
