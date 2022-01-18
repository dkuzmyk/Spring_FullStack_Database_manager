import React, { useEffect } from 'react';
import { Container, Paper, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TableAdmin from './TableAdmin';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function Admin({Authorized}){

    const [username, setName]=React.useState('');
    const [password, setPassword]=React.useState('')
    const [email, setEmail]=React.useState('')
 
    const paperStyle = {padding: '10px 30x', width:800, margin:'auto'}
    const paperStyle2 = {padding: '10px 20px', margin:'auto', width:'900px'}

    const [EmailOpen, setEmailWarning] = React.useState(false);
    const [UserOpen, setUserWarning] = React.useState(false);
    const [SuccOpen, setSucc] = React.useState(false);

    function refreshPage() {
        window.location.reload();
    }

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
            }, 2000);
            refreshPage();
          }
          
        })
      }

    return (
        <Container>
            <h1 className='Header'>Administration</h1>
            <Paper elevation={3} style={paperStyle2}>
                    <div>
                    <Paper elevation={3} style={paperStyle}>
                        <h2 color='black' >Add User</h2>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1,  },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <Stack direction='row' spacing={2}>
                            <TextField id="outlined-basic1" label="Email" variant="outlined" size='small'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <TextField id="outlined-basic2" label="Username" variant="outlined" size='small'
                                value={username}
                                onChange={(e)=>setName(e.target.value)}
                            /> 
                            <TextField id="outlined-basic3" label="Password" variant="outlined" size='small'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button variant="outlined" onClick={submitNew}>Submit</Button>
                            </Stack>
                        </Box>
                    </Paper>
                    </div>
                <TableAdmin />
            </Paper>
        </Container>
    )
}