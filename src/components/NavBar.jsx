import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function NavBar() {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar>
        {/* Voit lisätä halutessasi logon tai ikoninkin */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokemon Browser
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/pokemons" color="inherit">
          Pokemons
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;