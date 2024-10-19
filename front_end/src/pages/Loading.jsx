import React from 'react';
import './Loading.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p style={{fontSize : "30px", paddingTop: "10px", color: "#FFF5D9"}}>Gemini is thinking...</p>
    </div>
  );
}

export default LoadingPage;
