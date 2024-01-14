import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

import Top from './components/Top'
import Hero from './components/Hero'
import AdminLogin from './components/AdminLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" element= {
          <>
            <Top />
            <Hero />
            {/* <Footer /> */}
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App

