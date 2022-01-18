import React from 'react'

const Authorized = (a, b) => {

    const [administrator, setAdministrator] = React.useState(false);
    const [registeredUser, setRegisteredUser] = React.useState(false);

    if(a){
        setAdministrator(true);
    }

    if(b){
        setRegisteredUser(true);
    }

    const ret = {
        a : administrator,
        b : registeredUser
    }

    return (ret);
        
}

export default Authorized
