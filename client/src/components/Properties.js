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
      const response = await fetch(`http://localhost:3001/properties/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched properties:', data); // Log the fetched properties
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
              <h2>{property.propertyAddress}</h2>
              <p>{property.city}, {property.state}</p>
              <p>Type: {property.propertyType}</p>
              <p>Price: ${property.purchasePrice}</p>
              <p>Size: {property.propertySize} {property.sizeUnit}</p>
              <p>Year Built: {property.yearBuilt}</p>
              <p>Description: {property.description}</p>
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