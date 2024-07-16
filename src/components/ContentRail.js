import React, { useRef } from "react";
import GroupJobs from "../formatters/GroupJobs";
import useHandleRowClick from "../utils/useHandleRowClick";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

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
  overflow-x: hidden;
  padding: 0 10px 20px 10px;
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

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Character = styled.h4`
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
  color: gray;

  @media (min-width: 900px) {
    font-size: 16px;
  }
`;

const Arrow = styled.button`
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  z-index: 1;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default function ContentRail({ title, mediaType, data, length }) {
  // Get the row click handler
  const handleRowClick = useHandleRowClick();

  // Optionally slice the data if length is provided
  const titleList = length ? data.slice(0, length) : data;

  // Group the titles using GroupJobs
  const groupedTitles = GroupJobs(titleList);

  //Styled Component Carousel
  const railRef = useRef(null);

  const scrollLeft = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <RailContainer>
        <Arrow onClick={scrollLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Arrow>
        <Rail ref={railRef}>
          {mediaType === "person"
            ? groupedTitles.map((item, index) => (
                <Card
                  key={index}
                  onClick={(event) =>
                    handleRowClick(event, item.media_type, item.id)
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <Character>
                    {mediaType === "movie"
                      ? item.job.join(", ") // Display the aggregated job titles
                      : item.character}
                  </Character>
                </Card>
              ))
            : titleList.map((item, index) => (
                <Card
                  key={index}
                  onClick={(event) =>
                    handleRowClick(event, item.media_type, item.id)
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                </Card>
              ))}
        </Rail>
        <Arrow onClick={scrollRight}>
          {" "}
          <FontAwesomeIcon icon={faChevronRight} />
        </Arrow>
      </RailContainer>
    </Container>
  );
}
