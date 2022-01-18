import React from 'react'
import { Button } from '@mui/material';

const ReadOnlyTable = ({row, handleEditing, deleteUser}) => {
    return (
        <tr>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.password}</td>
            <td>
                <Button 
                variant="outlined" size='small'
                type="button" 
                onClick={(event) => handleEditing(event, row)} 
                >Edit
                </Button>
            </td>
            <td>
                <Button 
                variant="outlined" size='small'
                type="button" 
                onClick={(event) => deleteUser(event, row)} >
                Delete
                </Button>
            </td>
        </tr>
    )
}

export default ReadOnlyTable
