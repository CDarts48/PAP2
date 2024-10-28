import React, { useState } from 'react';

const Properties = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter a search query.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/properties/search?query=${query}`);
      const data = await response.json();
      setResults(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Error fetching properties. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Properties</h1>
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.length > 0 ? (
          results.map((property) => (
            <div key={property._id}>
              <h2>{property.name}</h2>
              <p>{property.location}</p>
              <p>{property.price}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;