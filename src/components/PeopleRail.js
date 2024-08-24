import React, {useCallback} from "react";
import useHandleRowClick from "../utils/useHandleRowClick";
import axios from "axios";
import { apiEndpoint, getHeaders } from "../utils/apiConfig"; 
// import GroupJobs from "../formatters/GroupJobs";
import styled from "styled-components";
import headshotNotFound from "../img/headshot_not_found.svg"

const Container = styled.div`
  margin: 15px 0;
`;

const RailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rail = styled.div`
  display: flex;
  overflow-x: scroll; /* Use scroll instead of hidden to show scrollbar */
  padding: 0 10px 20px 10px;
  scroll-behavior: smooth; /* Smooth scrolling */
  user-select: none; /* Prevent text selection while dragging */

  /* Customize scrollbar appearance */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Title = styled.h3`
  padding-left: 10px;
  font-size: 18px;

  @media (min-width: 900px) {
    font-size: 25px;
  }
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 100px;
  margin-right: 20px;

  @media (min-width: 900px) {
    width: 160px;
  }
`;

const Headshot = styled.img`
 border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;

    @media (min-width: 900px) {
  width: 150px;
  height: 150px;  }
`;

const Name = styled.h4`
  font-size: 14px;
  text-align: center;
  margin: 10px 0;

  @media (min-width: 900px) {
    font-size: 16px;
  }
`;

const Character = styled.h4`
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
  color: gray;
  font-weight: normal;

  @media (min-width: 900px) {
    font-size: 16px;
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



export default function PeopleRail({ title, data, length }) {
  const people = length ? data.slice(0, length) : data;

  console.log(data)
  console.log(people)

  const mediaType = "person";
  // const groupedTitles = GroupJobs(data);
  const handleRowClick = useHandleRowClick();

  const fetchPerson = useCallback(
    async (event, id) => {
      event.preventDefault();
      const apiURL = `${apiEndpoint}/person/${id}?language=en-US`;
      try {
        const response = await axios.get(apiURL, getHeaders());
        const personDetails = response.data;
        handleRowClick(event, mediaType, id, personDetails);
      } catch (error) {
        console.error(error);
      }
    },
    [handleRowClick]
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <RailContainer>
        <Rail>{people.map((item, index) => {
          const isFallback = !item.profile_path

          return (
        
          
          <Card key={index}
                  onClick={(event) => fetchPerson(event, item.id)}>

             {isFallback ? <FallbackHeadshot/> : <Headshot
                    src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                    alt={item.name}
                  />}
                  <Name>
                  {item.name}
                  </Name>
                  <Character>
                 {item.character || item.department.join(", ")}
                  </Character>
                  </Card>)}               
                )}
        </Rail>
      </RailContainer>
    </Container>
  );
}
