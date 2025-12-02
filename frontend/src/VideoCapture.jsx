import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function VideoCapture() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sentence, setSentence] = useState("");
  const [letters, setLetters] = useState([]); // letter + confidence
  const [lastMessage, setLastMessage] = useState("");
  const CONFIDENCE_THRESHOLD = 0.8;
  let typingTimeout;

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/", { image: imageSrc });
      const data = res.data;
      console.log("API Response:", data);

      if (data.letter && typeof data.confidence !== "undefined") {
        const predictedLetter = data.letter;
        const confidence = data.confidence;

        if (confidence >= CONFIDENCE_THRESHOLD) {
          setSentence(prev => prev + predictedLetter);
          setLetters(prev => [...prev, { letter: predictedLetter, confidence }]);
          setLastMessage("");

          if (typingTimeout) clearTimeout(typingTimeout);
          typingTimeout = setTimeout(() => {
            setSentence(prev => prev + " ");
          }, 1500);
        } else {
          setLastMessage("No sign detected or low confidence");
        }
      } else {
        setLastMessage("No sign detected");
      }
    } catch (err) {
      console.error("API Error:", err);
      setLastMessage("Connection error");
    }
    setLoading(false);
  };

  const clearSentence = () => {
    setSentence("");
    setLetters([]);
    setLastMessage("");
  };

  const removeLastLetter = () => {
    if (letters.length === 0) return;

    const newLetters = [...letters];
    newLetters.pop();
    setLetters(newLetters);

    let newSentence = sentence;
    if (newSentence.endsWith(" ")) newSentence = newSentence.slice(0, -1);
    newSentence = newSentence.slice(0, -1);
    setSentence(newSentence);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">GestureSpeak</h1>

      <div className="row justify-content-center align-items-start">
        <div className="col-md-6 text-center mb-3">
          <Webcam 
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        </div>

        <div className="col-md-5">
          <div className="sentence-card">
            <h4>Detected Sentence:</h4>
            <p>{sentence}</p>
          </div>

          <div className="history-card">
            <h5>Letters History:</h5>
            <div className="d-flex flex-wrap">
              {letters.map((item, index) => (
                <span
                  key={index}
                  className={`badge ${item.confidence >= CONFIDENCE_THRESHOLD ? "bg-primary" : "bg-danger"}`}
                  title={`Confidence: ${item.confidence.toFixed(2)}`}
                >
                  {item.letter} ({item.confidence.toFixed(2)})
                </span>
              ))}
            </div>
          </div>

          {/* Buttons and last message at bottom */}
          <div className="mt-3">
            <div className="button-container mb-2">
              <button 
                className="btn btn-success me-2"
                onClick={capture}
                disabled={loading}
              >
                {loading ? "Processing..." : "Capture"}
              </button>
              <button 
                className="btn btn-warning me-2"
                onClick={removeLastLetter}
              >
                Back
              </button>
              <button 
                className="btn btn-danger"
                onClick={clearSentence}
              >
                Clear
              </button>
            </div>

            {lastMessage && <div className="alert alert-warning alert-message">{lastMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCapture;
