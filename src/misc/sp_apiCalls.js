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
}