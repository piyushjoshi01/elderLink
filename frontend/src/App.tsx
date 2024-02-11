

import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import React from 'react';


import AppRoutes from './Routes/MainNavigation';
import { BrowserRouter } from 'react-router-dom';




function App() {

  return (
    <>
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
     
  
    </>
  )
}

export default App
