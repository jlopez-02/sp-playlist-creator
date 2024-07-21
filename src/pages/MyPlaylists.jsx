import React, { useEffect, useState } from "react";
import "./pages_css/MyPlaylists.css";
import { sp } from "./../misc/sp_apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const MyPlaylists = ({ user }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const allPlaylists = await sp.getUserPlaylists();
        const userPlaylists = allPlaylists.filter(playlist => playlist.owner.id === user.id);
        setPlaylists(userPlaylists);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="my-playlists-container">
      <section className="title-section">
        <h1>Mis Listas</h1>
        <p>Aquí podrás encontrar tus listas personalizadas</p>
      </section>


      <div className="playlists">
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => {
            const imageUrl =
              playlist.images !== null ? playlist.images[0]?.url : "";
            const playlistName =
              playlist.name !== "" ? playlist.name : "[Nombre no definido]";
              
            return (
              <div key={playlist.id} className="playlist-item">
                <div className="playlist-item-img-container">
                  {playlist.images !== null ? (
                    <img src={imageUrl} alt={playlist.name} />
                  ) : (
                    <div className="place-holder-img">
                      <FontAwesomeIcon icon={faImage} />
                    </div>
                  )}

                  <div className="playlist-item-view">
                    <p>Ver playlist</p>
                  </div>
                </div>

                <div
                  className="playlist-item-info"
                  style={playlist.name === "" ? { fontStyle: "italic" } : {}}
                >
                  <p>{playlistName}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No se encontraron playlists.</p>
        )}
      </div>
    </div>
  );
};

export default MyPlaylists;
