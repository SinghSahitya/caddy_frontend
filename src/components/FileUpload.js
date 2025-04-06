import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/FileUpload.css';

const FileUpload = ({ onResults, onLoading, onError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.off') && !fileName.endsWith('.stl')) {
        onError('Please upload a .OFF or .STL file format');
        setSelectedFile(null);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      setSelectedFile(file);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      onError('Please select a file first');
      return;
    }
    
    const formData = new FormData();
    formData.append('cadFile', selectedFile);
    
    try {
      onLoading(true);
      
      const response = await axios.post('https://caddy-zrp0.onrender.com/api/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      onResults(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      let errorMsg = 'Error uploading file';
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg = error.response.data.error;
      }
      onError(errorMsg);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.name.toLowerCase().endsWith('.off')) {
        onError('Please upload a .OFF file format');
        return;
      }
      setSelectedFile(file);
    }
  };
  
  return (
    <div className="file-upload">
      <div 
        className="drop-zone" 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="drop-zone-content">
          <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
          </svg>
          <p>Drag and drop your CAD file (.OFF/.STL) here</p>
          <p>or</p>
          <button className="browse-button">Browse Files</button>
          {selectedFile && <p className="selected-file">Selected: {selectedFile.name}</p>}
        </div>
      </div>
      
      <input
        type="file"
        accept=".off,.stl"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      
      <button 
        className="upload-button"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Classify CAD Model
      </button>
    </div>
  );
};

export default FileUpload;
