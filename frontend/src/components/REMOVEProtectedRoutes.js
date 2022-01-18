import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from './useAuth';

const ProtectedRoutes = () => {

    const {auth} = useAuth();

    if (auth.a) {
        return (
            auth.b ? <Outlet /> : <Navigate to="/Login" />
        )
    }else{
        return (
            auth.b ? <Outlet /> : <Navigate to="/Login" />
        )
    }
 
    
}

export default ProtectedRoutes
