// App.js
import React, { useState } from 'react';
import './App.css';
import VideoCapture from "./VideoCapture.jsx";

function App() {
  const [result, setResult] = useState('Waiting for capture...');

  return (
    <div className="App">
      <h1>Sign Language Translator</h1>
      <VideoCapture onResult={setResult} />
      <h2>Detected Sign: <span className="result">{result}</span></h2>
    </div>
  );
}

export default App;
