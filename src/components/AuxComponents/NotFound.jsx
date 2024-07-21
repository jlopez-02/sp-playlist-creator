import React from "react";
import './NotFound.css';

const NotFound = ({ title = "Card1", image = "Spotify_Logo_RGB_White.png" }) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>PÁGINA NO ENCONTRADA</h1>
        <h4>Comprueba la información</h4>
      </div>
    </div>
  );
};

export default NotFound;
