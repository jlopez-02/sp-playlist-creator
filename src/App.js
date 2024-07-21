import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlaylist from "./pages/CreatePlaylist";
import Header from "./components/Header/Header";
import "./App.css";
import SpotifyCallback from "./components/SpComponents/SpotifyCallback";
import { sp } from "./misc/sp_apiCalls";
import NotFound from "./components/AuxComponents/NotFound";
import MyPlaylists from "./pages/MyPlaylists";
//import { getUserData } from "./misc/sp_apiCalls";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  


  useEffect(() => {
    sp.getUserData(setUser);
  }, []);

  return (
    <Router>
      <div className="App" style={menuOpen ? { overflowY: 'hidden' } : { overflowY: 'auto' }}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/callback" element={<SpotifyCallback setUser={setUser}/>} />
            <Route path="/my-lists" element={<MyPlaylists user={user}/>} />
            <Route path="/contact" element={<CreatePlaylist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;