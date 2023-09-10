import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css'; // Import Select2 CSS
import 'select2'; // Import Select2 JavaScript

function Filter({ onFilterChange, distinctCities }) {
  const [selectedCities, setSelectedCities] = useState([]);
  const selectRef = useRef(null); // Ref for the select element

  useEffect(() => {
    // Initialize Select2 on the select element
    $(selectRef.current).select2();

    // Handle city selection
    const handleCitySelection = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedCities(selectedOptions);
      onFilterChange({ cities: selectedOptions });
    };

    // Attach the change event listener to the select element
    $(selectRef.current).on('change', handleCitySelection);

    // Cleanup when the component unmounts
    return () => {
      $(selectRef.current).off('change', handleCitySelection);
      $(selectRef.current).select2('destroy');
    };
  }, [onFilterChange]);

  // CSS to adjust the dropdown width
  const select2Style = {
    width: '50%', // Adjust the desired width here (e.g., 50% for half the width)
  };

  return (
    <div className="filter">
      <label htmlFor="cityFilter">Filter by city</label>
      <select
        id="cityFilter"
        multiple
        value={selectedCities}
        onChange={() => {}}
        ref={selectRef} // Assign the ref to the select element
        style={select2Style} // Apply the width style
      >
        {distinctCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
