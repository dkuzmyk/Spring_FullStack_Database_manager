import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Table(Authorized){
    const paperStyle={padding: '12px 25px', width:600, margin:'25px auto'};
    const[users, setUsers]=React.useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/users/getAll")
        .then(res => res.json())
        .then((result) => {
            setUsers(result);
        }).then(()=>{console.log('received')})},[]);
          
    return (
        
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 className="App">Users</h1>
                <table className='center'>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((row) => (
                    <tr>
                        <td>{row.username}</td>
                        <td>{row.email}</td>
          	        </tr>
          ))
          
          }
                    </tbody>
                </table>
            </Paper>
        </Container>
      
    );
}