import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Administration from './components/Administration';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import CustomBar from './components/CustomBar';
import About from './components/About';
import Table from './components/Table';

function App() {
  
  const [auth, setAuth] = React.useState(null);

  // autoupdate the permission on reload
  useEffect(() => {
    let admin = localStorage.getItem("admin");
    admin && JSON.parse(admin) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin", auth);
  }, [auth]);

  return (
    <Router>
    <CustomBar Authorized={ () => setAuth(false)} auth={auth}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login Authorized={ () => setAuth(true)}/>} />
        <Route path="/Table" element={<Table/>} />
        <Route path="/About" element={<About />} />
        <Route path="*" element={<ErrorPage />}/>
        {auth && (
        <Route path="/Administration" element={<Administration Authorized={ () => setAuth(true)}/>} />
        )}
      </Routes>   
    </Router>
  );
}

export default App;
