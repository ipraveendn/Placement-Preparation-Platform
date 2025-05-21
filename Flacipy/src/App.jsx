import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Herosec from './pages/Herosec/Herosec'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mock from './pages/Mock'


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/Mock" element={<Herosec/>} />
        <Route path="/" element={<Mock/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
