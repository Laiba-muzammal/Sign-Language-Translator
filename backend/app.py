from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    return jsonify({"letter": "A"})

if __name__ == '__main__':
    app.run(debug=True)
