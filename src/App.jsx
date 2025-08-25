import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SEO from './components/SEO'
import Home from './pages/Home'
import BaggageChecker from './pages/BaggageChecker'
import Marketing from './pages/Marketing';
import './index.css';

function App() {
  return (
    <>
      <SEO />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baggage-checker" element={<BaggageChecker />} />
          <Route path="/marketing" element={<Marketing />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App;