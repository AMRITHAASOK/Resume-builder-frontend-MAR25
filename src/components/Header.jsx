import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <div>
      <Box  sx={{paddingTop:'65px'}}>
      <AppBar position="fixed" sx={{backgroundColor:' rgb(53, 4, 99)'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            rBuilder
          </Typography>
          <Button color="inherit">About Us</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header
