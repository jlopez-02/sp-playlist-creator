import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlaylist from "./pages/CreatePlaylist";
import Header from "./components/Header/Header";
import "./App.css";

function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App" style={ menuOpen ? { overflowY:'hidden'} : { overflowY:'auto'}}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
