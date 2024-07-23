import axios from "axios";

export class sp {
  static apiUrl = "https://api.spotify.com/v1";

  static async getUserData(setUser) {
    const token = localStorage.getItem("spotify_token");
    if (!token) return;

    try {
      const response = await axios.get(`${sp.apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  static async getUserPlaylists() {
    const token = localStorage.getItem("spotify_token");
    if (!token) return [];

    try {
      const response = await axios.get(`${sp.apiUrl}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.items || [];
    } catch (error) {
      console.error("Error fetching playlists", error);
      return [];
    }
  }

  static async searchArtists(query) {
    const token = localStorage.getItem("spotify_token");
    if (!token) return [];

    try {
      const response = await axios.get(`${sp.apiUrl}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "artist",
          limit: 10,
        },
      });

      return response.data.artists.items;
    } catch (error) {
      console.error("Error searching artists", error);
      return [];
    }
  }

  static async getArtistTracksInRange(artistId, startDate, endDate) {
    const token = localStorage.getItem("spotify_token");
    if (!token) return [];

    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();

    try {
      let allTracks = [];
      for (let year = startYear; year <= endYear; year++) {
        const response = await axios.get(`${sp.apiUrl}/artists/${artistId}/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            include_groups: "album,single",
            market: "US",
            limit: 50,
            year,
          },
        });

        const albums = response.data.items;
        for (const album of albums) {
          const albumDate = new Date(album.release_date);
          if (albumDate >= new Date(startDate) && albumDate <= new Date(endDate)) {
            const albumTracks = await axios.get(`${album.href}/tracks`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            allTracks = [...allTracks, ...albumTracks.data.items];
          }
        }
      }

      console.log(allTracks);
      return allTracks;
    } catch (error) {
      console.error("Error fetching artist tracks", error);
      return [];
    }
  }

  static async createPlaylist(userId, playlistName) {
    const token = localStorage.getItem("spotify_token");
    if (!token) return null;

    try {
      const response = await axios.post(
        `${sp.apiUrl}/users/${userId}/playlists`,
        {
          name: playlistName,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating playlist", error);
      return null;
    }
  }

  static async addTracksToPlaylist(playlistId, trackUris) {
    const token = localStorage.getItem("spotify_token");
    if (!token) return;

    try {
      await axios.post(
        `${sp.apiUrl}/playlists/${playlistId}/tracks`,
        {
          uris: trackUris,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding tracks to playlist", error);
    }
  }
}