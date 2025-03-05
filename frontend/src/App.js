import { useState, useEffect } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import Legend from './components/Legend';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDefaultFile, setUsingDefaultFile] = useState(true);
  const [defaultNumbers, setDefaultNumbers] = useState([]);

  useEffect(() => {
    // Fetch the default numbers once when the component mounts
    fetchDefaultNumbers();
  }, []);

  useEffect(() => {
    // If we're using the default file, set numbers to defaultNumbers
    if (usingDefaultFile && defaultNumbers.length > 0) {
      setNumbers(defaultNumbers);
      setLoading(false);
    }
  }, [usingDefaultFile, defaultNumbers]);

  const fetchDefaultNumbers = () => {
    setLoading(true);
    // Fetch the numbers from the JSON file
    fetch(process.env.PUBLIC_URL + '/numbers.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch numbers');
        }
        return response.json();
      })
      .then(data => {
        setDefaultNumbers(data);
        if (usingDefaultFile) {
          setNumbers(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching numbers:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const handleNumbersLoaded = (uploadedNumbers) => {
    setNumbers(uploadedNumbers);
    setUsingDefaultFile(false);
    setLoading(false);
    setError(null);
  };

  const resetToDefault = () => {
    setUsingDefaultFile(true);
  };

  // Check if a number is in the default numbers array
  const isInDefaultNumbers = (number) => {
    return defaultNumbers.includes(number);
  };

  // Get statistics about common and unique numbers
  const getComparisonStats = () => {
    if (usingDefaultFile || numbers.length === 0 || defaultNumbers.length === 0) {
      return null;
    }

    const commonNumbers = numbers.filter(num => isInDefaultNumbers(num));
    const uniqueNumbers = numbers.filter(num => !isInDefaultNumbers(num));
    
    return {
      common: {
        count: commonNumbers.length,
        percentage: ((commonNumbers.length / numbers.length) * 100).toFixed(1),
        numbers: commonNumbers
      },
      unique: {
        count: uniqueNumbers.length,
        percentage: ((uniqueNumbers.length / numbers.length) * 100).toFixed(1),
        numbers: uniqueNumbers
      }
    };
  };

  const comparisonStats = getComparisonStats();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Display App</h1>
        
        <FileUploader onNumbersLoaded={handleNumbersLoaded} />
        
        {!usingDefaultFile && (
          <button className="reset-button" onClick={resetToDefault}>
            Reset to Default Numbers
          </button>
        )}
        
        {loading && <p>Loading numbers...</p>}
        
        {error && <p className="error">Error: {error}</p>}
        
        {!loading && !error && numbers.length > 0 && (
          <div className="numbers-container">
            <h2>Numbers from {usingDefaultFile ? 'Default' : 'Uploaded'} JSON File:</h2>
            
            {!usingDefaultFile && (
              <div className="explanation-box">
                <p className="highlight-info">
                  Numbers highlighted in yellow are those from your uploaded file that also appear in the default file.
                </p>
                <p className="explanation-text">
                  The default file contains: [{defaultNumbers.join(', ')}]
                </p>
                <p className="explanation-text">
                  Your uploaded file contains: [{numbers.join(', ')}]
                </p>
              </div>
            )}
            
            <div className="numbers-grid">
              {numbers.map((number, index) => {
                const isHighlighted = !usingDefaultFile && isInDefaultNumbers(number);
                return (
                  <div 
                    key={index} 
                    className={`number-card ${isHighlighted ? 'highlighted' : ''}`}
                    title={isHighlighted ? 'This number also appears in the default file' : ''}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
            
            <div className="numbers-stats">
              <h3>Basic Statistics</h3>
              <p>Total numbers: {numbers.length}</p>
              <p>Sum: {numbers.reduce((sum, num) => sum + num, 0)}</p>
              <p>Average: {(numbers.reduce((sum, num) => sum + num, 0) / numbers.length).toFixed(2)}</p>
              <p>Min: {Math.min(...numbers)}</p>
              <p>Max: {Math.max(...numbers)}</p>
            </div>
            
            {comparisonStats && (
              <div className="comparison-stats">
                <h3>Comparison with Default File</h3>
                <div className="comparison-row">
                  <div className="comparison-item">
                    <h4>Numbers That Appear in Both Files</h4>
                    <p>{comparisonStats.common.count} numbers ({comparisonStats.common.percentage}%)</p>
                    <div className="small-numbers">
                      {comparisonStats.common.numbers.join(', ')}
                    </div>
                  </div>
                  <div className="comparison-item">
                    <h4>Numbers Only in Your Uploaded File</h4>
                    <p>{comparisonStats.unique.count} numbers ({comparisonStats.unique.percentage}%)</p>
                    <div className="small-numbers">
                      {comparisonStats.unique.numbers.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <Legend isUploaded={!usingDefaultFile} />
          </div>
        )}
        
        {!loading && !error && numbers.length === 0 && (
          <p>No numbers to display. Please upload a JSON file with numbers.</p>
        )}
      </header>
    </div>
  );
}

export default App;
