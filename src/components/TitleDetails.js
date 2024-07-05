import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  margin-right: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Overview = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const Info = styled.div`
  margin: 10px 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

function TitleDetails({ mediaType, details }) {
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
        <Info>
          <InfoLabel>Genres:</InfoLabel>{" "}
          {details.genres.map((genre) => genre.name).join(", ")}
        </Info>
        <Info>
          <InfoLabel>Rating:</InfoLabel> {details.vote_average}
        </Info>
        <Overview>{details.overview}</Overview>
      </Details>
    </Container>
  );
}

export default TitleDetails;
