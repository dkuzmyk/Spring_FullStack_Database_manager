import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicTextFields() {
    const paperStyle={padding: '12px 25px', width:600, margin:'25px auto'};
    const [username, setName]=React.useState('');
    const [password, setPassword]=React.useState('')
    const [email, setEmail]=React.useState('')
    let navigate = useNavigate();

    const [EmailOpen, setEmailWarning] = React.useState(false);
    const [UserOpen, setUserWarning] = React.useState(false);
    const [SuccOpen, setSucc] = React.useState(false);

    const submitNew=(e)=>{
        e.preventDefault()
        const user={username, password, email}
        console.log(user)
        fetch("http://localhost:8080/users/add",{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(user)    
        }).then((response)=> {
          console.log(JSON.stringify(user));
          return response.json();
        }).then((res) => {
          console.log(res);
          if(res.username === "ERROR"){
            // error popup username taken
            console.log("username error")
            setUserWarning(true);
            setTimeout(function() {
              setUserWarning(false);
            }, 2000);
          }
          if (res.email === "ERROR"){
            // error popup email taken
            console.log("email error");
             setEmailWarning(true);
             setTimeout(function() {
               setEmailWarning(false);
             }, 2000);
          }
          if(res.email !== "ERROR" && res.username !== "ERROR"){
            // success popup user created
            setSucc(true);
            setTimeout(function() {
              setSucc(false);
              navigate("/table");
            }, 2000);
          }
          
        })
      }
    return (

      <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Register</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    ><TextField id="outlined-basic1" label="Email" variant="outlined" fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
     />
      <TextField id="outlined-basic2" label="Username" variant="outlined" fullWidth
          value={username}
          onChange={(e)=>setName(e.target.value)}
      /> 
     <TextField id="outlined-basic3" label="Password" variant="outlined" fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
     />
     <Button variant="outlined" onClick={submitNew}>Submit</Button>
    
    </Box>
    </Paper>

    <Box sx={{ width: '100%' }}>
      <Collapse in={UserOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setUserWarning(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Username is already in use.
        </Alert>
        </Collapse>
        <Collapse in={EmailOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEmailWarning(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Email already in use.
        </Alert>
      </Collapse>
      <Collapse in={SuccOpen}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSucc(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Registration Successful! Redirecting to the table..
        </Alert>
      </Collapse>
      </Box>

    </Container>
  );
}
