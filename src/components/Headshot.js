import React from "react";
import styled from 'styled-components';

const FallbackHeadshot = styled.div`
  background-color: #dbdbdb;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
`;

export default function Heashot({ imageurl, altText, isFallback
}) {
 
return (
 isFallback ? (
   <FallbackHeadshot imageurl={imageurl} />
 ) : <img src={imageurl} alt={altText} className="img-headshot" />
);
}
