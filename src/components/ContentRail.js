import React from "react";
import GroupJobs from "../formatters/GroupJobs";
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
`;

export default function ContentRail({ title, mediaType, data, length }) {
  const titleList = data.slice(0, length);
  const groupedTitles = GroupJobs(titleList);
  return (
    <div>
      <Title>{title}</Title>
      <Container>
        {groupedTitles.map((item, index) => (
          <Card key={index}>
            <Image
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.title || item.name}
            />
            <Character>
              {item.character || item.job.map((job, index) => job).join(", ")}
            </Character>
          </Card>
        ))}
      </Container>
    </div>
  );
}
