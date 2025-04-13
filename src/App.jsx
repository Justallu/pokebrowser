import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonBrowser from "./pages/PokemonBrowser";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonBrowser />} />
      </Routes>
    </>
  );
}

export default App;