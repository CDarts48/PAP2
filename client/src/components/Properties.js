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
        {results.length > 0 && results.map((property) => (
          <div key={property._id}>
            <h2>{property.propertyAddress}</h2>
            <p>Account Number: {property.accountNumber}</p>
            <p>Total Account Value: {property.totalAccountValue}</p>
            <h3>Account Table Data:</h3>
            <ul>
              {property.accountTableData.map((data, index) => (
                <li key={index}>
                  <p>Label: {data.label}</p>
                  <p>Actual: {data.actual}</p>
                  <p>Assessed: {data.assessed}</p>
                </li>
              ))}
            </ul>
            <h3>Tenants:</h3>
            <ul>
              {property.tenants.map((tenant, index) => (
                <li key={index}>
                  <p>Name: {tenant.name}</p>
                  <p>Move-In Date: {tenant.moveInDate}</p>
                  <p>Rent: {tenant.rent}</p>
                  <p>Lease Duration: {tenant.leaseDuration} months</p>
                  <p>Contact Info: {tenant.contactInfo.email}, {tenant.contactInfo.phone}</p>
                  <p>Water Submeter:</p>
                  <ul>
                    <li>Serial Number: {tenant.waterSubmeter.serialNumber}</li>
                    <li>Installation Date: {tenant.waterSubmeter.installationDate}</li>
                    <li>Last Reading: {tenant.waterSubmeter.lastReading}</li>
                  </ul>
                </li>
              ))}
            </ul>
            <h3>Units:</h3>
            <ul>
              {property.units.map((unit, index) => (
                <li key={index}>
                  <p>Unit Number: {unit.unitNumber}</p>
                  <p>Size: {unit.size}</p>
                  <p>Rent: {unit.rent}</p>
                  <p>Tenant: {unit.tenant}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;