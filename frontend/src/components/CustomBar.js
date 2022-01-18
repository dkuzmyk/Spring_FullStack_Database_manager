import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

// passing in function to flip confirm authorization and the variable that defines it
export default function ButtonAppBar({Authorized, auth}) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const [log, setLog] = React.useState("Login");

  // login button switch
  useEffect(() => {
    if(auth){
      setLog('Log-out');
    }
    if(!auth){
      setLog('Login');
    }
  })

  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // implement a dropdown menu to log-out and to go back to registration
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={darkTheme}>

       <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={()=>{navigate("/Login")}}>Login</MenuItem>
              <MenuItem onClick={()=>{navigate("/")}}>Registration</MenuItem>
              <MenuItem onClick={()=>{navigate("/Table")}}>Table</MenuItem>
              <MenuItem onClick={()=>{navigate("/About")}}>About</MenuItem>              
            </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spring Boot React MySQL Database Manager
          </Typography>
          
            {/* implement a log out that will drop the admin authorization */}
          <Button onClick={()=>{navigate("/Login"); Authorized(false)}} color="inherit">{log}</Button>
          
        </Toolbar>
      </AppBar> 
      </ThemeProvider>
    </Box>
  );
}
