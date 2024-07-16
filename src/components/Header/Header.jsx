import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img
          alt=""
          className="spotify-logo"
          src={require("../../images/Spotify_Primary_Logo_RGB_White.png")}
        />
        <p>Spotify Playlist Generator</p>
      </div>
      <button 
        className={`burger-menu ${menuOpen ? 'hidden' : 'burger-menu-visible'}`} 
        onClick={toggleMenu}
      >
        ☰
      </button>
      <button 
        className={`burger-menu ${menuOpen ? 'burger-menu-visible i-cross' : 'hidden'}`} 
        onClick={toggleMenu}
      >
        X
      </button>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/create-playlist">Crear Lista</Link>
          </li>
          <li>
            <Link to="/">Mis Listas</Link>
          </li>
          <li>
            <Link to="/">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
