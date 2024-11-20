import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Tebo from './assets/Tebo.png';
import './App.css';
import Properties from './components/Properties';

const Content = () => {
  const location = useLocation();
  if (location.pathname === '/properties') {
    return null; // Hide everything except the image
  }
  return (
    <div className="button-group">
      <Link to="/properties">
        <button>Properties</button>
      </Link>
      <button>Unit</button>
      <button>HomeDepot</button>
      <button>Tenants</button>
      <button>Payments</button>
    </div>
  );
};

const Home = () => (
  <div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={Tebo} className="App-logo" alt="Tebo Logo" />
          <Content />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;