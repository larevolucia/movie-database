// src/components/Details.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleDetails from "./TitleDetails";
import PersonDetails from "./PersonDetails";
import { apiEndpoint, getHeaders } from "../utils/apiConfig";

function Details() {
  const { id, mediaType } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${apiEndpoint}/${mediaType}/${id}?language=en-US`,
          getHeaders()
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!details) {
    return <div>No details available</div>;
  }

  return (
    <div>
      {mediaType === "movie" || mediaType === "tv" ? (
        <TitleDetails mediaType={mediaType} details={details} />
      ) : (
        <PersonDetails mediaType={mediaType} details={details} />
      )}
    </div>
  );
}

export default Details;
