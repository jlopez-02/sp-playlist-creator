import React from "react";

const Card = ({ title = "Card1", image = "Spotify_Logo_RGB_White.png" }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img
        alt=""
        className="spotify-logo"
        src={require("../../images/" + image)}
      />
    </div>
  );
};

export default Card;
