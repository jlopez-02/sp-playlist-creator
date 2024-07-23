import React, { useEffect, useRef, useState } from "react";
import { sp } from "./../misc/sp_apiCalls";
import "./pages_css/CreatePlaylist.css";
import Calendar from "../components/AuxComponents/Calendar";

const CreatePlaylist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [user, setUser] = useState(null);
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
    setSelectedArtists([
      ...selectedArtists,
      { ...artist, startDate: "", endDate: "" },
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

    const playlist = await sp.createPlaylist(user.id, playlistName);
    if (!playlist) {
      console.error("Failed to create playlist");
      return;
    }

    let allTracks = [];
    for (const artist of selectedArtists) {
      const tracks = await sp.getArtistTracksInRange(
        artist.id,
        artist.startDate,
        artist.endDate
      );
      console.log(artist.startDate, artist.endDate);
      allTracks = [...allTracks, ...tracks];
    }

    const trackUris = allTracks.map(track => track.uri);

    await sp.addTracksToPlaylist(playlist.id, trackUris);

    console.log(`Playlist ${playlistName} created with ${trackUris.length} tracks`);
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
      <h1>Crear Playlist</h1>
      <div className="create-playlist-content">
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
                <li key={artist.id} onClick={() => handleSelectArtist(artist)}>
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

              <Calendar artist={artist} handleDateChange={handleDateChange} />
              <button onClick={() => handleRemoveArtist(artist.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="create-playlist-form">
          <button onClick={handleCreatePlaylist}>Crear Playlist</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
