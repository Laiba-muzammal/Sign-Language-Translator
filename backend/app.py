import os
import base64
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL_URL = os.getenv("ROBOFLOW_MODEL_URL")

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def predict():
    try:
        data = request.json
        # The React code sends the image with "image" key
        # But you need to handle the base64 data URL properly
        if 'image' not in data:
            return jsonify({"error": "No image received"}), 400
        
        image64 = data['image']
        
        # Remove the "data:image/jpeg;base64," prefix if present
        if ',' in image64:
            image64 = image64.split(',')[1]
        
        # Decode the base64 image
        imagebytes = base64.b64decode(image64)
        
        response = requests.post(
            ROBOFLOW_MODEL_URL,
            headers={"Authorization": f"Bearer {ROBOFLOW_API_KEY}"},
            files={"file": imagebytes}
        )
        
        # Debug: Print the response to see what RoboFlow returns
        print("RoboFlow Response:", response.json())
        
        result = response.json()
        
        # Handle case where predictions array might be empty
        predictions = result.get("predictions", [])
        if not predictions:
            return jsonify({"error": "No predictions"}), 400
        
        letter = predictions[0].get("class", "?")
        confidence = predictions[0].get("confidence", 0)  
        return jsonify({"letter": letter, "confidence": confidence}) 
        
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Prediction failed"}), 500


if __name__ == '__main__':
    app.run(debug=True)
