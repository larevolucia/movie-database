import React from "react";
import styled from 'styled-components';

const FallbackPoster = styled.div`
  background-color: #dbdbdb;
  height: 201px;
  width: 134px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ $imageurl }) => `url(${$imageurl})`};
`;

export default function Poster({ imageurl, altText, isFallback
 }) {
  
return (
  isFallback ? (
    <FallbackPoster imageurl={imageurl} />
  ) : <img src={imageurl} alt={altText} />
);
}
