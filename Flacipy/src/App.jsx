import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Herosec from './pages/Herosec/Herosec';
import Mock from './pages/Mock';
import SkillPractice from './pages/SkillPractice/SkillPractice';

const Layout = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Herosec />} />
        <Route path="/mock" element={<Mock />} />
        <Route path="/skill" element={<SkillPractice />} />
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
