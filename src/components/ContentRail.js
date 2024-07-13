import React from "react";
import GroupJobs from "../formatters/GroupJobs";
import useHandleRowClick from "../utils/useHandleRowClick";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 0 10px 20px 10px;
`;

const Title = styled.h2`
  padding-left: 10px;
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Character = styled.h3`
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
  color: gray;
`;

export default function ContentRail({ title, mediaType, data, length }) {
  // Get the row click handler
  const handleRowClick = useHandleRowClick();

  // Optionally slice the data if length is provided
  const titleList = length ? data.slice(0, length) : data;

  // Group the titles using GroupJobs
  const groupedTitles = GroupJobs(titleList);

  return (
    <div>
      <Title>{title}</Title>
      <Container>
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
      </Container>
    </div>
  );
}
