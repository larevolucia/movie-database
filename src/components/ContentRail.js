import React from "react";
import GroupJobs from "../formatters/GroupJobs";
import useHandleRowClick from "../utils/useHandleRowClick";
import styled from "styled-components";

const Container = styled.div`
  margin: 15px 0;
`;
const Rail = styled.div`
  display: flex;
  overflow-x: scroll;
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

export default function ContentRail({ title, mediaType, data, length }) {
  // Get the row click handler
  const handleRowClick = useHandleRowClick();

  // Optionally slice the data if length is provided
  const titleList = length ? data.slice(0, length) : data;

  // Group the titles using GroupJobs
  const groupedTitles = GroupJobs(titleList);

  return (
    <Container>
      <Title>{title}</Title>
      <Rail>
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
    </Container>
  );
}
