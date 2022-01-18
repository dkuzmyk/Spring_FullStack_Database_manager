import React from 'react'
import { Button } from '@mui/material';

const EditOnlyTable = ({handleSaveFieldData, fieldData, cancelAction}) => {
    return (
        <tr>
            <td>{fieldData.id}</td>
            <td> <input 
            type='text' 
            placeholder='Username' 
            name='username'
            value={fieldData.username}
            onChange={handleSaveFieldData}>
            </input></td>
            <td> <input 
            type='text' 
            placeholder='Email' 
            name='email'
            value={fieldData.email}
            onChange={handleSaveFieldData}>
            </input></td>
            <td><input 
            type='text' 
            placeholder='Password' 
            name='password'
            value={fieldData.password}
            onChange={handleSaveFieldData}>
            </input></td>
            <td><Button type='submit' variant="outlined" size='small'>          
                Save
            </Button>
            <Button type='button' variant="outlined" size='small'
            onClick={cancelAction}>
                Cancel
            </Button>
            </td>
        </tr>

    )
}

export default EditOnlyTable
