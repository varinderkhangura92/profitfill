function DataTable({ filteredData }) {
  // Check if filteredData is empty or undefined
  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="data-table">
        <h2>Postal Code Report</h2>
        <p>No data available.</p>
      </div>
    );
  }

  // Create a map to store unique postal codes and their aggregated data
  const uniquePostalCodes = new Map();

  // Process the filtered data to aggregate values for each unique postal code
  filteredData.forEach((row) => {
    const postalCodeFSA = row['Postal Code FSA'];

    // Check if the row has a postal code and it doesn't exist in uniquePostalCodes
    if (postalCodeFSA) {
      if (!uniquePostalCodes.has(postalCodeFSA)) {
        uniquePostalCodes.set(postalCodeFSA, {
          city: row['Location City'],
          jobs: 0,
          revenue: 0,
          count: 0,
        });
      }

      // If the row has completed jobs and completed revenue, add them to the corresponding postal code
      if (!isNaN(row['Completed Jobs']) && !isNaN(row['Completed Revenue'])) {
        const postalCodeData = uniquePostalCodes.get(postalCodeFSA);
        postalCodeData.jobs += parseFloat(row['Completed Jobs']);
        postalCodeData.revenue += parseFloat(row['Completed Revenue']);
        postalCodeData.count += 1;
      }
    }
  });

  // Find the lowest and highest average values
  let lowestAverage = Number.MAX_VALUE;
  let highestAverage = Number.MIN_VALUE;

  [...uniquePostalCodes.keys()].forEach((postalCodeFSA) => {
    const postalCodeData = uniquePostalCodes.get(postalCodeFSA);
    const averageRevenuePerJob = postalCodeData.revenue / postalCodeData.jobs;

    if (averageRevenuePerJob < lowestAverage) {
      lowestAverage = averageRevenuePerJob;
    }

    if (averageRevenuePerJob > highestAverage) {
      highestAverage = averageRevenuePerJob;
    }
  });

  return (
    <div className="data-table">
      <h2>Postal Code Report</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-primary text-white">Postal Code FSA</th>
            <th className="bg-primary text-white">City</th>
            <th className="bg-primary text-white">Completed # of Jobs</th>
            <th className="bg-primary text-white">Completed Revenue</th>
            <th className="bg-primary text-white">Average Revenue Per Job</th>
          </tr>
        </thead>
        <tbody>
          {[...uniquePostalCodes.keys()].map((postalCodeFSA, index) => {
            const postalCodeData = uniquePostalCodes.get(postalCodeFSA);
            const averageRevenuePerJob = postalCodeData.revenue / postalCodeData.jobs;
            const cellBackgroundColor =
              averageRevenuePerJob === lowestAverage
                ? 'red' // Set red background color for the lowest average
                : averageRevenuePerJob === highestAverage
                ? 'green' // Set green background color for the highest average
                : 'white'; // Default background color

            return (
              <tr key={index}>
                <td>{postalCodeFSA}</td>
                <td>{postalCodeData.city}</td>
                <td>{postalCodeData.jobs}</td>
                <td>${postalCodeData.revenue.toFixed(2)}</td>
                <td style={{ backgroundColor: cellBackgroundColor }}>
                  ${averageRevenuePerJob.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
