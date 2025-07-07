import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
function Header() {
  const longText = `
A Resume Builder App is an essential tool for job seekers looking to create polished and effective resumes. By combining ease of use with professional design options, these apps empower users to present their qualifications confidently and increase their chances of landing job interviews.
`;
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
          <Tooltip title={longText}>
                 <Button color="inherit">About Us</Button>

      </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header
