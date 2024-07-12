import React, { useCallback, useEffect, useState } from "react";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import FormattedFullDate from "../formatters/FormattedFullDate";
import useWindowSize from "../hooks/useWindowSize";
import ContentRail from "./ContentRail";
import ParagraphFormatter from "../formatters/ParagraphFormatter";
import styled from "styled-components";
import axios from "axios";

const Header = styled.div`
  padding: 10px 5px;
`;

const Headshot = styled.img`
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

const Biography = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const PersonalInfo = styled.div`
  padding: 0.5rem;
`;

const Info = styled.p`
  margin-top: 0.5em;
`;

const Toggler = styled.div`
  font-weight: 700;
  display: block;
  @media (min-width: 600px) {
    display: none;
  }
`;

export default function PersonDetails({ mediaType, details }) {
  // State to track if the full text is shown
  const formattedBiography = ParagraphFormatter(details.biography);
  const [isExpanded, setIsExpanded] = useState(false);
  const windowSize = useWindowSize();
  const isSmallScreen = windowSize.width <= 600;
  const [castTitles, setCastTitles] = useState([]);
  const [crewTitles, setCrewTitles] = useState([]);

  // Function to toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchTitles = useCallback(async () => {
    const apiURL = `${apiEndpoint}/person/${details.id}/combined_credits`;
    try {
      const response = await axios.get(apiURL, getHeaders());
      console.log(response.data);
      setCastTitles(response.data.cast);
      setCrewTitles(response.data.crew);
    } catch (error) {
      console.error(error);
    }
  }, [details.id]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  console.log(details);
  return (
    <div>
      <Header>
        <h1>{details.name}</h1>
        <p>{details.known_for_department}</p>
      </Header>
      <Details>
        <div>
          <Headshot
            src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
            alt={details.name}
          />
          {windowSize.width <= 600 && (
            <PersonalInfo>
              <Info>
                <strong>Born</strong>{" "}
                <FormattedFullDate fullDate={details.birthday} />
              </Info>
              <Info>
                <strong>Place of birth</strong> {details.place_of_birth}
              </Info>
            </PersonalInfo>
          )}
        </div>

        <Biography>
          {isSmallScreen
            ? isExpanded
              ? formattedBiography
              : ` ${formattedBiography.substring(0, 285)}...`
            : formattedBiography}
          {isSmallScreen && (
            <Toggler onClick={toggleExpand}>
              {isExpanded ? "See Less" : "See More"}
            </Toggler>
          )}
        </Biography>
        {windowSize.width > 600 && (
          <PersonalInfo>
            <Info>
              <strong>Born!</strong>{" "}
              <FormattedFullDate fullDate={details.birthday} />
            </Info>
            <Info>
              <strong>Place of birth</strong> {details.place_of_birth}
            </Info>
          </PersonalInfo>
        )}
      </Details>
      {castTitles && (
        <ContentRail
          title="Known For"
          mediaType={mediaType}
          data={
            details.known_for_department === "Acting" ? castTitles : crewTitles
          }
          length={24}
        />
      )}
    </div>
  );
}
