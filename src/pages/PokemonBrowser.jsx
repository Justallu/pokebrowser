import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const PokemonBrowser = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  const [offset, setOffset] = useState(50); 
  const limit = 25; 
  const [totalCount, setTotalCount] = useState(0);

 
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json();

        setPokemonList(data.results || []);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Virhe haettaessa Pokemon-listaa:", error);
      }
    };

    fetchPokemonList();
    setSelectedPokemonUrl(null);
    setSelectedPokemonData(null);
  }, [offset]);

  useEffect(() => {
    if (!selectedPokemonUrl) return;

    const fetchSelectedPokemon = async () => {
      try {
        const response = await fetch(selectedPokemonUrl);
        const data = await response.json();
        setSelectedPokemonData(data);
      } catch (error) {
        console.error("Virhe haettaessa Pokemonin tietoja:", error);
      }
    };

    fetchSelectedPokemon();
  }, [selectedPokemonUrl]);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const handleSelectPokemon = (url) => {
    setSelectedPokemonUrl(url);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pokemon-selain
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ border: "1px solid #ddd", padding: 1 }}>
            <List>
              {pokemonList.map((pokemon, index) => (
                <ListItemButton
                  key={pokemon.name}
                  onClick={() => handleSelectPokemon(pokemon.url)}
                >
                  <ListItemText primary={pokemon.name} />
                </ListItemButton>
              ))}
            </List>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Button variant="contained" onClick={handlePrevPage} disabled={offset <= 0}>
                Prev
              </Button>
              <Typography>Page {currentPage}</Typography>
              <Button variant="contained" onClick={handleNextPage} disabled={offset + limit >= totalCount}>
                Next
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          {selectedPokemonData ? (
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={
                  selectedPokemonData.sprites?.other?.["official-artwork"]?.front_default ||
                  selectedPokemonData.sprites?.front_default ||
                  ""
                }
                alt={selectedPokemonData.name}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedPokemonData.name}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Types:</strong>{" "}
                  {selectedPokemonData.types
                    ?.map((t) => t.type.name)
                    .join(", ")}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Abilities:</strong>{" "}
                  {selectedPokemonData.abilities
                    ?.map((a) => a.ability.name)
                    .join(", ")}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Moves:</strong>
                  <ul style={{ marginTop: 0 }}>
                    {selectedPokemonData.moves.slice(0, 5).map((m) => (
                      <li key={m.move.name}>{m.move.name}</li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1">
              Valitse listasta Pokemon nähdäksesi tarkemmat tiedot.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonBrowser;