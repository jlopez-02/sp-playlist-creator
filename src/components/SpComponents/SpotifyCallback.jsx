// src/components/SpotifyCallback.js
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Spotify.css";
import { sp } from "../../misc/sp_apiCalls";


const SpotifyCallback = ({setUser}) => {
  const location = useLocation();


  useEffect(() => {
    const getAccessToken = async (code) => {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'http://localhost:3000/callback');
      params.append('client_id', 'cd94803c352d41ebb5ccb110b98f6e89');
      params.append('client_secret', '94215f3d9a3243bfab35029d306ea369');

      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params);
        const { access_token } = response.data;
        localStorage.setItem('spotify_token', access_token);
        
        sp.getUserData(setUser);
        
        window.location.href = '/';
      } catch (error) {
        console.error('Error obtaining token', error);
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');


    
    if (code) {
      getAccessToken(code);
    }else{
      window.location.href = '/';
    }
  }, [location, setUser]);

  return (
    <div className="spotify-callback">
      <div className="loader"></div>
    </div>
  );
};

export default SpotifyCallback;
