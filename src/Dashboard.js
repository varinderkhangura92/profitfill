import React, { useEffect, useState, useMemo } from 'react';
import Filter from './Filter';
import DataTable from './Datatable';
import { csvparsedata } from './csvparsedata';

function Dashboard() {
  const [data, setData] = useState([]);
  const [distinctCities, setDistinctCities] = useState([]);
  const [filters, setFilters] = useState({
    cities: [], // Initialize with an empty array
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const csvFileUrl = process.env.PUBLIC_URL + '/profitfill-raw-data.csv';

    csvparsedata(csvFileUrl)
      .then((parsedData) => {
        // Remove dollar signs ($) and parse "Completed Revenue" values as numbers
        parsedData.forEach((row) => {
          if (typeof row['Completed Revenue'] === 'string') {
            row['Completed Revenue'] = parseFloat(row['Completed Revenue'].replace('$', '').replace(',', ''));
          }
        });

        setData(parsedData);

        const cities = parsedData
          .map((item) => (item['Location City'] ? item['Location City'].trim() : ''))
          .filter((item) => item);

        const distinctCities = [...new Set(cities)];
        setDistinctCities(distinctCities);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        filters.cities.length === 0 || filters.cities.includes(item['Location City'])
      );
    });
  }, [data, filters]);
// CSS for the dashboard header
const dashboardHeaderStyle = {
  backgroundColor: '#1e415f', // Background color
  color: 'white', // Text color
  padding: '10px', // Padding
  textAlign: 'right', // Text alignment
  fontSize: '20px !important', // Text size with !important
 // fontFamily: 'Arial, sans-serif', // Font family
  marginBottom: '10px', // Margin at the bottom
};
  return (
    <div className="dashboard">
        {/* Dashboard Header */}
      <div style={dashboardHeaderStyle}>
        My Dashboard
      </div>
      <Filter onFilterChange={handleFilterChange} distinctCities={distinctCities} />
      <DataTable filteredData={filteredData} />
    </div>
  );
}

export default Dashboard;
