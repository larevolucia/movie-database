import React from "react";
import styled from 'styled-components';

const FallbackPoster = styled.div`
  background-color: #dbdbdb;
  height: 201px;
  width: 134px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export default function Poster({ imageUrl, altText, isFallback
 }) {
  
return (
  isFallback ? (
    <FallbackPoster imageUrl={imageUrl} />
  ) : <img src={imageUrl} alt={altText} />
);
}
