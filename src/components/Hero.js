import React from "react";
import useHandleRowClick from "../utils/useHandleRowClick";
import "../styles/Hero.css";

export default function Hero({ data }) {

  const handleRowClick = useHandleRowClick();
    if (data){
    return (
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {data.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner" data-testid="hero">
          {data.map((item, index) => {
            const { id, media_type, name, title, backdrop_path } = item;
            const landscapeImg = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
            const altText = `${name || title}`;
            return (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                onClick={(event) => handleRowClick(event, media_type, id)}
              >
                <img
                  src={landscapeImg}
                  className="d-block w-100"
                  alt={altText}
                />{" "}
                <div className="carousel-caption">
                  <h2 className="shadow-text">{name || title}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
  return null;
}
