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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        image64=data.get("image64")

        if not image64:
            return jsonify({"error":"No image recieved"}),400
        
        imagebytes=base64.b64decode(image64.split(",")[1])

        response=requests.post(
            ROBOFLOW_MODEL_URL,
            headers={"Authorization":f"Bearer {ROBOFLOW_API_KEY}"},
            files={"files":imagebytes}
        )

        result=response.json()

        letter = result.get("predictions", [{}])[0].get("class", "?")
        return jsonify({"letter": letter})

    except Exception as e:
        print(e)
        return jsonify({"error":"Predication failed"}),500


if __name__ == '__main__':
    app.run(debug=True)
