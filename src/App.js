import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import PointCloudViewer from './components/PointCloudViewer';
import './styles/App.css';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleResults = (data) => {
    setResults(data);
    setIsLoading(false);
  };
  
  const handleLoading = (loading) => {
    setIsLoading(loading);
    if (loading) {
      setError(null);
      setResults(null);
    }
  };
  
  const handleError = (err) => {
    setIsLoading(false);
    
    // Extract error message if err is an object with an error property
    const errorMessage = err && typeof err === 'object' && err.error 
      ? err.error 
      : err;
    
    // Check for specific error messages that need friendly responses
    if (typeof errorMessage === 'string' && 
        (errorMessage.includes("'Scene' object has no attribute 'sample'") || 
         errorMessage.includes("Error processing CAD file"))) {
      setError({
        friendly: true,
        message: "Sorry, I couldn't analyze this 3D model. I'm still learning and improving! Try uploading a different model with simple geometry."
      });
    } else {
      // For other errors, keep the original message
      setError({
        friendly: false,
        message: errorMessage
      });
    }
  };
  


  return (
    <div className="app">
      <header className="app-header">
        <h1>CAD Model Classification</h1>
        <p>Upload a CAD file (.OFF or .STL format) to classify it using PointNet++</p>
      </header>

      <main className="app-main">
        <div className="upload-section">
          <FileUpload 
            onResults={handleResults} 
            onLoading={handleLoading}
            onError={handleError}
          />
          
          {isLoading && (
            <div className="loading-container">
              <ClipLoader color="#3498db" size={50} />
              <p>Processing your CAD model...</p>
            </div>
          )}
          
          {error && (
            <div className={`error-message ${error.friendly ? 'friendly-error' : ''}`}>
              {error.friendly ? (
                <>
                  <h3>Oops! I'm still learning</h3>
                  <p>{error.message}</p>
                  <small>Try a different file or a simpler model</small>
                </>
              ) : (
                <>
                  <h3>Error</h3>
                  <p>{error.message}</p>
                </>
              )}
            </div>
          )}

        </div>
        
        {results && (
          <div className="results-section">
            <div className="results-container">
              <ResultsDisplay results={results} />
            </div>
            
            <div className="visualization-container">
              <h2>3D Point Cloud Visualization</h2>
              <PointCloudViewer pointCloud={results.pointCloud} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>CADDY - Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
