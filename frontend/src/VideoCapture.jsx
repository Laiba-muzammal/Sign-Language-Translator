// VideoCapture.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function VideoCapture({ onResult }) {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (!imageSrc) {
      console.error("Failed to capture image");
      onResult("Error: No image captured");
      return;
    }
    
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/", {
        image: imageSrc,
      });

      console.log("API Response:", res.data); // Debugging purpose

      if (res.data.letter) {
        onResult(res.data.letter);
      } else if (res.data.error) {
        onResult(`Error: ${res.data.error}`);
      } else {
        onResult("Unknown response");
      }
    } catch (err) {
      console.error("API Error:", err);
      onResult("Connection Error");
    }

    setLoading(false);
  };

  return (
    <div>
      <Webcam 
        ref={webcamRef} 
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
      />
      <button onClick={capture} disabled={loading}>
        {loading ? "Processing..." : "Capture"}
      </button>
    </div>
  );
}

export default VideoCapture;
