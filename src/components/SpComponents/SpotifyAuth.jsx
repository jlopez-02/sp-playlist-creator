import React from 'react';
import {REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPES} from './../../misc/sp_config';

const SpotifyAuth = ({type = "login", setUser}) => {
  const CLIENT_ID = 'cd94803c352d41ebb5ccb110b98f6e89';
  //const REDIRECT_URI = 'http://localhost:3000/callback';
  //const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  //const RESPONSE_TYPE = 'code';
  //const SCOPES = "user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private"

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}&show_dialog=true`;
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div onClick={type === "login" ? handleLogin : handleLogout} style={ {cursor : 'pointer'} }>
      {type === "login" ? "Iniciar Sesión" : "Cerrar Sesión"}
    </div>
  );
};

export default SpotifyAuth;
