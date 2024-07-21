import React, { useState } from "react";
import "./Profile.css";
import SpotifyAuth from "../SpComponents/SpotifyAuth";

const Profile = ({ user, setUser }) => {
  const [profileOpened, setProfileOpened] = useState(false);
  return (
    <div
      className="profile-section"
      onClick={() => setProfileOpened(!profileOpened)}
    >
      <div className="profile-info">
        <div className="img-container">
          <img src={user.images[0].url} alt="" />
        </div>

        <label>{user.display_name}</label>
        <svg
          className={
            profileOpened
              ? "Svg-sc-ytk21e-0 bRkBFt profile-caret-up"
              : "Svg-sc-ytk21e-0 bRkBFt profile-caret-down"
          }
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="m19 15-7-7-7 7h14z"></path>
        </svg>
      </div>
      {profileOpened && (
        <div className="profile-menu">
          <ul>
            <li>
              <SpotifyAuth type="logout" setUser={setUser} />
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
