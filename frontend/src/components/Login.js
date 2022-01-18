import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function Login({Authorized}){    
    const paperStyle={padding: '12px 25px', width:600, margin:'25px auto'};
    const [username, setName]=React.useState('');
    const [password, setPassword]=React.useState('');
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();
    //const {log} = Auth();

    const submitLog=(e)=>{
        e.preventDefault()
        const user={username, password}
        console.log(user)
        fetch("http://localhost:8080/users/login",{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(user)    
        }).then((response)=> {
          console.log(JSON.stringify(user));
          return response.json();
        }).then((res) => {
          console.log(res);
          if(res.admin === true){
            Authorized();
            navigate("/Administration");
          }
          else if (res.admin === false){
            navigate("/Table");
          }
          else{
            setOpen(true);
            setTimeout(function() {
              setOpen(false);
            }, 2000);
          }
        })
      }
      // get response from server and see if it's a valid login and if an admin or not
      // redirect to administration if admin, redirect to a table if not admin
      // show error if login fails
      
    return (
        <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Log In</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
          value={username}
          onChange={(e)=>setName(e.target.value)}
      /> 
     <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
     />
     <Button variant="outlined" onClick={submitLog}>LogIn</Button>
    </Box>
    </Paper>
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          User or Password doesn't match.
        </Alert>
      </Collapse>
      </Box>
    </Container>
    );
}

export default Login
