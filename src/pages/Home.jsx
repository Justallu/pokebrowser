import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Tervetuloa Pokemon-selaimeen!
      </Typography>
      <Typography variant="body1">
        Selaa eri Pokemoneja ja tutustu niiden ominaisuuksiin.
      </Typography>
      <Box
        component="img"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pikachu"
        sx={{
          maxWidth: "200px",
          display: "block",
          margin: "auto",
        }}
      />
       <Box
        component="footer"
        sx={{
          marginTop: 4,
          padding: 2,
          textAlign: "center",
          borderTop: "1px solid #ccc",
        }}
      >
        <Typography variant="caption">Pokémon Browser Created By Alpertti Fält copyright 2025</Typography>
      </Box>
    </Container>
  );
}

export default Home;