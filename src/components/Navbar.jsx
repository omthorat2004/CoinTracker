import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoinTracker
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ mx: 1 }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/watchlists"
            sx={{ mx: 1 }}
          >
            Watch List
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;