import Papa from 'papaparse';

export const csvparsedata = async (csvFileUrl) => {
  try {
    const response = await fetch(csvFileUrl);
    const csvData = await response.text();

    // Parse the CSV data using papaparse
    const { data } = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    return data;
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
    return [];
  }
};
