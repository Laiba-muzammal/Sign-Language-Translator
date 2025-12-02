# 🖐️ **GestureSpeak — Sign Language Translator**

A full-stack Sign Language Translator that converts **real-time hand gestures into text**.
The backend uses **Flask + Roboflow API**, and the frontend uses **React + Webcam** for live capture.

---

## ⭐ **Overview**

GestureSpeak allows users to communicate using American Sign Language (ASL) by detecting hand gestures via webcam and translating them into text.

* Real-time gesture capturing
* Flask backend REST API
* React frontend with webcam stream
* RoboFlow model API integration
* Clean & modular architecture
* Ready for future AI/ML model enhancement

---

## 📸 **Screenshots**

Screenshots will be added as UI completes.

| Home Screen | Gesture Capture | Prediction Output |
|-------------|-----------------|-------------------|
| ![1](https://via.placeholder.com/300x180?text=Screenshot+1) | ![2](https://via.placeholder.com/300x180?text=Screenshot+2) | ![3](https://via.placeholder.com/300x180?text=Screenshot+3) |

| History Panel | Confidence Badges | Full Interface |
|---------------|-------------------|----------------|
| ![4](https://via.placeholder.com/300x180?text=Screenshot+4) | ![5](https://via.placeholder.com/300x180?text=Screenshot+5) | ![6](https://via.placeholder.com/300x180?text=Screenshot+6) |


---

## 📁 **Project Structure**

```
SignLanguageTranslator/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── VideoCapture.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## 🚀 **Features**

### 🎥 Frontend
* Webcam-based gesture capture
* Bootstrap-styled UI
* Live predictions displayed as:
  * **Sentence**
  * **Letter history with confidence**
* Capture, Back, and Clear controls
* Confidence threshold filtering

### 🔧 Backend
* Flask API (`POST /`)
* Receives Base64 webcam image
* Sends image to RoboFlow Model
* Returns:
  * `letter`
  * `confidence`

---

## 🧠 **Main Backend Code (Summary)**

The backend:

* Accepts the Base64 image
* Strips metadata prefix
* Sends image to RoboFlow
* Picks highest-confidence prediction
* Returns detected letter + confidence

---

## 🧩 **How to Run the Project**

### ▶️ Backend Setup

```bash
cd backend
python -m venv venv
./venv/Scripts/Activate.ps1
pip install -r requirements.txt
python app.py
```

Ensure `.env` contains:

```
ROBOFLOW_API_KEY=your_api_key
ROBOFLOW_MODEL_URL=your_model_url
```

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🛠️ **Technologies Used**

### Backend

* Python
* Flask
* Flask-CORS
* RoboFlow API

### Frontend

* React
* react-webcam
* Axios
* Bootstrap

---

>  **Notes**

* RoboFlow model integration is working.
* Confidence threshold set to **0.8**.
* Dummy predictions replaced with real API output.
* venv/ and node_modules/ and others are ignored by Git.

---

## 📄 **License**

MIT License

