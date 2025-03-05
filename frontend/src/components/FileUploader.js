import { useState } from 'react';

function FileUploader({ onNumbersLoaded }) {
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Check if file is JSON
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        
        // Validate that content is an array of numbers
        if (!Array.isArray(content)) {
          setError('The JSON file must contain an array');
          return;
        }
        
        const allNumbers = content.every(item => typeof item === 'number');
        if (!allNumbers) {
          setError('The JSON file must contain only numbers');
          return;
        }
        
        // Clear any previous errors
        setError(null);
        
        // Pass the numbers to the parent component
        onNumbersLoaded(content);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setError('Invalid JSON format');
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file');
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="file-uploader">
      <h3>Upload your own JSON file</h3>
      <p className="upload-instructions">
        The file should contain a simple array of numbers, e.g. [1, 2, 3, 4, 5]
      </p>
      
      <div className="file-actions">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="file-input"
        />
        
        <div className="sample-links">
          <a 
            href={process.env.PUBLIC_URL + '/sample.json'} 
            download="sample.json"
            className="download-sample"
          >
            Download Sample JSON
          </a>
          <a 
            href={process.env.PUBLIC_URL + '/overlap-sample.json'} 
            download="overlap-sample.json"
            className="download-sample"
          >
            Download Sample with Overlapping Numbers
          </a>
          <a 
            href={process.env.PUBLIC_URL + '/example-for-highlighting.json'} 
            download="example-for-highlighting.json"
            className="download-sample highlight-example"
          >
            Download Highlighting Example
          </a>
        </div>
      </div>
      
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default FileUploader; 