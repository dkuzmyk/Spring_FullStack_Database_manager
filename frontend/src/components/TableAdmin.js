import { Container } from '@mui/material';
import React, { useEffect, Fragment } from 'react';
import { Paper } from '@mui/material';
import ReadOnlyTable from './ReadOnlyTable';
import EditOnlyTable from './EditOnlyTable';


export default function Table(){
    const paperStyle={padding: '12px 25px', width:800, margin:'auto'};
    // data for table
    const[users, setUsers]=React.useState([]);
    // to select the right row to edit
    const[editUser, setEditUser] = React.useState(null);
    // container for field data
    const [fieldData,saveFieldData] = React.useState({
        id:"",
        username:"",
        password:"",
        email:"",
        admin:false
    });

    function refreshPage() {
        window.location.reload();
    }

    // edit button, grab the row that's being edited
    const handleEditingButton = (event, row) => {
        event.preventDefault();
        setEditUser(row.id);
        console.log('row data:'+JSON.stringify(row));

        const fieldValues = {
            id: row.id,
            username: row.username,
            password: row.password,
            email: row.email,
            admin: row.admin            
        }
        saveFieldData(fieldValues);
    };

    // delete button 
    const deleteUser = (event, row) => {

        const delUser = {
            id: row.id,
            username: row.username,
            email: row.email,
            password: row.password
        }

        fetch("http://localhost:8080/users/delete",{
          method:"DELETE",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(delUser)    
        });

        refreshPage();
    }

    // cancel action of editing 
    const cancelAction = () => {
        setEditUser(null);
    }

    // on confirm button click send a PUT request do database
    const confirmEditing = (event) => {
        //event.preventDefault();

        const editedUser = {
            id: fieldData.id,
            username: fieldData.username,
            email: fieldData.email,
            password: fieldData.password
        }

        fetch("http://localhost:8080/users/edit",{
          method:"PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(editedUser)    
        });

    };

    // automatically fetches data from database to display the table
    useEffect(() => {
        fetch("http://localhost:8080/users/getAll")
        .then(res => res.json())
        .then((result) => {
            setUsers(result);
        }).then(()=>{console.log('received')})},[]);

    // saves the User data from fields when editing
    const handleSaveFieldData = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newForm = {...fieldData};
        newForm[fieldName] = fieldValue;
        saveFieldData(newForm);
    };

    return (
        
        <Container className='App'>
            <Paper elevation={3} style={paperStyle}>
                <h1 className="App">Users</h1>
                <form onSubmit={confirmEditing}>
                <table className='center'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Password</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((row) => (
                        <Fragment key={row.id}>
                        {editUser === row.id ? (<EditOnlyTable 
                            handleSaveFieldData={handleSaveFieldData}
                            fieldData={fieldData}
                            cancelAction={cancelAction}
                        />) :
                         (<ReadOnlyTable 
                         row={row} 
                         handleEditing={handleEditingButton}
                         deleteUser={deleteUser}
                         />)}
                        </Fragment>
                    ))}
                    </tbody>
                </table>
                </form> 
            </Paper>
        </Container>
      
    );
}