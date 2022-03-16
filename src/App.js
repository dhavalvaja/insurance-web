import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Insurance from './components/Insurance';
import Feedback from './components/Feedback';
import ForgotPassword from './components/ForgotPassword';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Mpredict from './components/Mpredict';
import Lpredict from './components/Lpredict';
import History from './components/History';
import Test from './components/Test';
import Predict from './components/Predict';

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
        <Route path='/contact' element={<Contact />} />
        <Route path='/predictions/health-insurance-predict' element={<Mpredict />} />
        <Route path='/predictions/life-insurance-predict' element={<Lpredict />} />
        <Route path='/history' element={<History />} />
        <Route path='/test' element={<Test />} />
        <Route path='/predictions' element={<Predict/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
