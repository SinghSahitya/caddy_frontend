import React from 'react';
import '../styles/ResultsDisplay.css';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;
  
  const { predictedClass, confidence, topPredictions } = results;
  
  return (
    <div className="results-display">
      <h2>Classification Results</h2>
      
      <div className="main-prediction">
        <h3>Predicted Class</h3>
        <div className="prediction-card">
          <div className="prediction-name">{predictedClass}</div>
          <div className="prediction-confidence">
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidence}%` }}
              />
            </div>
            <div className="confidence-value">{confidence ? confidence.toFixed(2) : 0}%</div>
          </div>
        </div>
      </div>
      
      <div className="top-predictions">
        <h3>Top 3 Predictions</h3>
        <div className="predictions-list">
          {topPredictions && topPredictions.map((prediction, index) => (
            <div className="prediction-card" key={index}>
              <div className="prediction-name">{prediction.className}</div>
              <div className="prediction-confidence">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${prediction.probability}%` }}
                  />
                </div>
                <div className="confidence-value">
                    {prediction.probability ? prediction.probability.toFixed(2) : 0}%
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
