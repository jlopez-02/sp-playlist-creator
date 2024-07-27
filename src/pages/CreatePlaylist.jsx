import React, { useEffect, useRef, useState } from "react";
import { sp } from "./../misc/sp_apiCalls";
import Texts from "./../texts/texts";
import "./pages_css/CreatePlaylist.css";
import Calendar from "../components/AuxComponents/Calendar";
import Loader from "../components/AuxComponents/Loader";

const CreatePlaylist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [user, setUser] = useState(null);
  const [lastGeneratedTracks, setLastGeneratedTracks] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const searchRef = useRef(null);
  

  useEffect(() => {
    sp.getUserData(setUser);
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      const results = await sp.searchArtists(e.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectArtist = (artist) => {
    const defaultStartDate = new Date();
    defaultStartDate.setFullYear(defaultStartDate.getFullYear() - 1);
    const defaultEndDate = new Date();

    setSelectedArtists([
      ...selectedArtists,
      {
        ...artist,
        startDate: defaultStartDate.toISOString().split("T")[0],
        endDate: defaultEndDate.toISOString().split("T")[0],
      },
    ]);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleRemoveArtist = (artistId) => {
    setSelectedArtists(
      selectedArtists.filter((artist) => artist.id !== artistId)
    );
  };

  const handleDateChange = (artistId, startDate, endDate) => {
    setSelectedArtists(
      selectedArtists.map((artist) =>
        artist.id === artistId ? { ...artist, startDate, endDate } : artist
      )
    );
  };

  const handleCreatePlaylist = async () => {
    if (!user || !playlistName) {
      console.error("User data or playlist name missing");
      return;
    }

    setIsLoading(true); // Comienza la carga

    try {
      const playlist = await sp.createPlaylist(user.id, playlistName);
      if (!playlist) {
        console.error("Failed to create playlist");
        setIsLoading(false); // Finaliza la carga
        return;
      }

      let allTracks = [];
      for (const artist of selectedArtists) {
        const tracks = await sp.getArtistTracksInRange(
          artist.id,
          artist.startDate,
          artist.endDate
        );
        // Filtra las canciones para asegurarte que solo pertenecen al artista seleccionado
        const filteredTracks = tracks.filter((track) =>
          track.artists.some((artistInTrack) => artistInTrack.id === artist.id)
        );
        allTracks = [...allTracks, ...filteredTracks];
      }

      // Elimina duplicados utilizando un Set
      const trackUrisSet = new Set(allTracks.map((track) => track.uri));
      const trackUris = Array.from(trackUrisSet);

      const chunkSize = 100;
      for (let i = 0; i < trackUris.length; i += chunkSize) {
        const chunk = trackUris.slice(i, i + chunkSize);
        await sp.addTracksToPlaylist(playlist.id, chunk);
      }
      setLastGeneratedTracks(trackUris.length);
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setIsLoading(false); // Finaliza la carga
      setIsPopUpVisible(true);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="create-playlist-container">
      <div className={isPopUpVisible ? "popup-overlay show" : "popup-overlay"} id="popup">
        <div className="popup-content">
          <h1>¡Playlist Completada!</h1>
          <p>Ya está disponible tu playlist</p>
          <p>Nombre: <b>{playlistName}</b></p>
          <p>¡<b>{lastGeneratedTracks}</b> {lastGeneratedTracks === 1 ? "canción añadida!" : "canciones añadidas!"} </p>
          <button onClick={() => setIsPopUpVisible(false)}>Cerrar</button>
        </div>
      </div>

      <h1>Crea una playlist personalizada con tus artistas favoritos.</h1>
      <h4>{Texts.getCreatePlaylistDescription()}</h4>
      <div className="create-playlist-content">
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <div className="search-bar" ref={searchRef}>
              <label>Nombre de la playlist</label>
              <input
                type="text"
                placeholder="Nombre de la playlist"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <label>Buscar artistas</label>
              <input
                type="text"
                placeholder="Buscar artistas..."
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map((artist) => (
                    <li
                      key={artist.id}
                      onClick={() => handleSelectArtist(artist)}
                    >
                      <img src={artist.images[0]?.url} alt={artist.name} />
                      <span>{artist.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="selected-artists-container">
              {selectedArtists.map((artist) => (
                <div key={artist.id} className="selected-artist">
                  <img src={artist.images[0]?.url} alt={artist.name} />
                  <span>{artist.name}</span>

                  <Calendar
                    artist={artist}
                    handleDateChange={handleDateChange}
                  />
                  <button onClick={() => handleRemoveArtist(artist.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div className="create-playlist-form">
              <button onClick={handleCreatePlaylist}>Crear Playlist</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
