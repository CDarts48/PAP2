import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import tebo from './assets/Tebo.png';
import './App.css';
import Properties from './components/Properties'; // Import the Properties component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={tebo} className="App-logo" alt="Tebo Logo" />
          <div className="button-group">
            <Link to="/properties">
              <button>Properties</button>
            </Link>
            <button>Unit</button>
            <button>Tenants</button>
            <button>Payments</button>
          </div>
        </header>
        <Routes>
          <Route path="/properties" element={<Properties />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;