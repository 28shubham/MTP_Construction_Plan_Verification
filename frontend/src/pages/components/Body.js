import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Body.css'; // Ensure this path is correct
import VerificationForm from '../VerificationForm';

function Body() {
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationPath, setVerificationPath] = useState('/api/verify'); // Default path
  
  // Handle file upload and processing
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]); // Assuming single file upload
  };

  // Function to verify the construction plan
  const verifyConstructionPlan = async () => {
    if (!file) {
      alert('Please upload a file before verifying.');
      return;
    }

    if (!verificationPath) {
      alert('Please enter a verification path.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(verificationPath, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setVerificationResult(result);
    } catch (error) {
      console.error('Error verifying construction plan:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'] // Accept both .jpeg and .jpg
    },
  });

  return (
    <div className="body-container">
      <h2>Upload Construction Plan for Verification</h2>
      
      {/* Input for verification path
      <div className="path-input">
        <label htmlFor="verificationPath">Verification Path:</label>
        <input
          type="text"
          id="verificationPath"
          value={verificationPath}
          onChange={(e) => setVerificationPath(e.target.value)}
          placeholder="/api/verify"
        />
      </div> */}
      
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop your construction plan here, or click to select a file (PDF or JPEG)</p>
      </div>
      
      {file && (
        <div className="file-info">
          <h3>File Selected:</h3>
          <p>{file.name}</p>
        </div>
      )}

      {/* Verify Button */}
      <button onClick={verifyConstructionPlan} className="verify-button">
        Verify
      </button>
      
      {verificationResult && (
        <div className="verification-results">
          <h3>Verification Results:</h3>
          <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
        </div>
      )}
      
      {/* Navigation Link */}
      <div className="navigation-link">
        <Link to="/VerificationForm ">Go to Verification by User Input</Link>
      </div>
    </div>
  );
}

export default Body;
