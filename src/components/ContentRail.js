import React from "react";
import GroupJobs from "../formatters/GroupJobs";
import useHandleRowClick from "../utils/useHandleRowClick";
import imgNotFound from "../img/img_not_found.svg";
import styled from "styled-components";

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
  overflow-x: scroll;
  padding: 0 10px 20px 10px;
  scroll-behavior: smooth;
  user-select: none;
  
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

const FallbackImage = styled.div`
  width: 100px;
  height: 150px;
  background-color: #dbdbdb;
  background-image: url(${imgNotFound});
  background-size: 50%; /* Adjust this to control the size of the SVG */
  background-repeat: no-repeat;
  background-position: center;

  @media (min-width: 900px) {
    width: 160px;
    height: 240px;
  }
`;


export default function ContentRail({ title, pageType, data, length }) {
  const handleRowClick = useHandleRowClick();
  const titleList = length ? data.slice(0, length) : data;
  const groupedTitles = GroupJobs(titleList);

  
  if (data.length === 0) {
    return null;
  }

    
  return (
    <Container>
      <Title>{title}</Title>
      <RailContainer>
        <Rail>
          {pageType === "person"
            ? groupedTitles.map((item, index) => {
                const isFallback = !item.poster_path;
                const jobs = !item.job ? "N/A" : item.job.join(", ")
                const character = item.character !== "" ? item.character : "N/A"

                if (!item.poster_path) return null

                return (
                  <Card
                    key={index}
                    onClick={(event) =>
                      handleRowClick(event, item.media_type, item.id)
                    }
                  >
                    {isFallback ? (
                      <FallbackImage />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title || item.name}
                        style={{ width: '100%', height: 'auto' }} // Ensure responsive image sizing
                      />
                    )}
                         
                    <Character>
                      {character || jobs}
                    </Character>
                  </Card>
                );
              })
            : titleList.map((item, index) => {
                const isFallback = !item.poster_path;

                if (!item.poster_path) return null

                return (
                  <Card
                    key={index}
                    onClick={(event) =>
                      handleRowClick(event, item.media_type, item.id)
                    }
                  >
                    {isFallback ? (
                      <FallbackImage />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title || item.name}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                        
                  </Card>
                );
              })}
        </Rail>
      </RailContainer>
    </Container>
  );
}
