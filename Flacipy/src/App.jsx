import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Herosec from './pages/Herosec/Herosec';
import Mock from './pages/Mock';
import SkillPractice from './pages/SkillPractice/SkillPractice';

// Wrapper to access location inside Routes
const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Herosec" element={<Herosec />} />
        <Route path="/Mock" element={<Mock />} />
        <Route path="/Skill" element={<SkillPractice />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
