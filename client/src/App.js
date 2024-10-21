import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import tebo from './assets/Tebo.png';
import './App.css';
import Properties from './components/Properties'; // Import the Properties component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={tebo} className="App-logo" alt="Tebo Logo" />
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
      <button>Tenants</button>
      <button>Payments</button>
    </div>
  );
};

const Home = () => (
  <div>
    <h1>Welcome to the Home Page</h1>
  </div>
);

export default App;