import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";
import FormattedFullDate from "../formatters/FormattedFullDate";
import useWindowSize from "../hooks/useWindowSize";
import ContentRail from "./ContentRail";
import headshotNotFound from "../img/headshot_not_found.svg"
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

const FallbackHeadshot = styled.div`
  background-color: #dbdbdb;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image:  url(${headshotNotFound});
      @media (min-width: 900px) {
  width: 150px;
  height: 150px;  }

`;


export default function PersonDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [details, setDetails] = useState(state?.personDetails || null);
  const [isExpanded, setIsExpanded] = useState(false);
  const windowSize = useWindowSize();
  const isSmallScreen = windowSize.width <= 600;
  const [castTitles, setCastTitles] = useState([]);
  const [crewTitles, setCrewTitles] = useState([]);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchPersonDetails = useCallback(async () => {
    if (!details) {
      const apiURL = `${apiEndpoint}/person/${id}?language=en-US`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id, details]);

  const fetchTitles = useCallback(async () => {
    if (details) {
      const apiURL = `${apiEndpoint}/person/${details.id}/combined_credits`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        setCastTitles(response.data.cast);
        setCrewTitles(response.data.crew);
      } catch (error) {
        console.error(error);
      }
    }
  }, [details]);

  useEffect(() => {
    if (!state?.personDetails) {
      fetchPersonDetails();
    }
  }, [fetchPersonDetails, state?.personDetails]);
  
  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);
  
  if (!details) return <div>Loading...</div>;

  const isFallback = !details.profile_path

  const formattedBiography = details.biography
    .split("\n\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);


  return (
    <div>
      <Header>
        <h1>{details.name}</h1>
        <p>{details.known_for_department}</p>
      </Header>
      <Details>
        <div>
          {isFallback ? <FallbackHeadshot/> :<Headshot
            src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
            alt={details.name}
          />}
          {windowSize.width <= 600 && (
            <PersonalInfo>
              {details.birthday !== null ?<Info>
                 <strong>Born</strong>{" "}
                <FormattedFullDate fullDate={details.birthday} /> 
              </Info>: null}
              {details.place_of_birth !== null ? <Info>
                <strong>Place of birth</strong> {details.place_of_birth}
              </Info> : null}
            </PersonalInfo>
          )}
        </div>

        {details.biography !== "" ? <Biography>
          {isSmallScreen
            ? isExpanded
              ? formattedBiography
              : ` ${details.biography.substring(0, 285)}...`
            : formattedBiography}

          {isSmallScreen && (
            <Toggler onClick={toggleExpand}>
              {isExpanded ? "See Less" : "See More"}
            </Toggler>
          )}
        </Biography>: <Biography>No details available.</Biography>}
        {windowSize.width > 600 && (
          <PersonalInfo>
            {details.birthday !== null ?<Info>
              <strong>Born</strong>{" "}
              <FormattedFullDate fullDate={details.birthday} />
            </Info>: null}
            {details.place_of_birth !== null ? <Info>
              <strong>Place of birth</strong> {details.place_of_birth}
            </Info>: null}
          </PersonalInfo>
        )}
      </Details>
      {castTitles.length > 0 || crewTitles.length > 0 ? (
        <ContentRail
          title="Known For"
          pageType="person"
          data={details.known_for_department === "Acting" ? castTitles : crewTitles}
          length={24}
        />
      ) : null}
    </div>
  );
}
