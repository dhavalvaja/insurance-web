import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import Navbar from './components/Navbar';
import AuthProvider from './Authcontext';
import Profile from './components/Profile';
import Insurance from './components/Insurance';
import Feedback from './components/Feedback';
import ForgotPassword from './components/ForgotPassword';
import UserInfo from './components/UserInfo'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/insurance' element={<Insurance />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
