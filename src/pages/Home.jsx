import React from "react";
import "./pages_css/Home.css";
import Card from "../components/AuxComponents/Cards";

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido a Spotify Playlist Generator</h1>
      <p>
        En esta página podrás crear listas personalizadas de tus cantantes
        favoritos.
      </p>
      <div className="preview-container">
        <Card title="Crea tu playlist"/>
        <Card title="Mis playlist"/>
        <Card title="Contacto"/>
      </div>
      <div className="update-blog">NUEVOS CAMBIOS</div>
    </div>
  );
};

export default Home;
