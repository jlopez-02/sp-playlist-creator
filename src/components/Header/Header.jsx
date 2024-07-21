import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import SpotifyAuth from "../SpComponents/SpotifyAuth";
import Profile from "../AuxComponents/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBars,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ menuOpen, setMenuOpen, user, setUser }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location, setMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "";
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
        className={`burger-menu ${menuOpen ? "hidden" : "burger-menu-visible"}`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <button
        className={`burger-menu ${
          menuOpen ? "burger-menu-visible i-cross" : "hidden"
        }`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faX} />
      </button>

      <nav className={`nav ${menuOpen ? "open" : "close"}`}>
        <ul>
          <li>
            <Link to="/" className={getLinkClass("/")}>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/create-playlist"
              className={getLinkClass("/create-playlist")}
            >
              Crear Lista
            </Link>
          </li>
          <li>
            <Link to="/my-lists" className={getLinkClass("/my-lists")}>
              Mis Listas
            </Link>
          </li>
          <li>
            <Link to="/contact" className={getLinkClass("/contact")}>
              Contacto
            </Link>
          </li>
          {user ? (
            <>
              {windowWidth <= 1200 ? (
                <li>
                  <SpotifyAuth type="logout" setUser={setUser} />
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </li>
              ) : (
                <Profile user={user} setUser={setUser} />
              )}
            </>
          ) : (
            <>
              {windowWidth <= 1200 ? (
                <li>
                  <SpotifyAuth type="login" setUser={setUser} />
                  <FontAwesomeIcon icon={faAngleRight} />
                </li>
              ) : (
                <li className="login-button-wide">
                  <SpotifyAuth type="login" setUser={setUser} />
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
