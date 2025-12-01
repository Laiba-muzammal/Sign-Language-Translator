
# Sign Language Translator 🖐️

**Status:** 🚧 Under Development  
A full-stack Sign Language Translator that converts real-time hand gestures into text using **Python (Flask)** for the backend and **React** for the frontend.

## Overview
This project enables users to communicate using American Sign Language (ASL) by translating hand gestures into text. The backend exposes a REST API for predictions, while the frontend captures webcam input and displays predicted letters in real-time.

## Features
- Real-time gesture recognition (dummy prediction currently)
- Flask backend with `/predict` API
- React frontend with webcam capture
- Modular, maintainable code structure
- Ready for AI/ML model integration
- Deployment-ready architecture

## Project Structure
SignLanguageTranslator/
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── venv/ # Ignored in Git
├── frontend/
│ ├── package.json
│ └── src/
│ ├── App.js
│ └── VideoCapture.js
└── .gitignore


## Setup Instructions

### Backend
```
cd backend
python -m venv venv
./venv/Scripts/Activate.ps1  # Windows
pip install -r requirements.txt
python app.py
```

### Frontend
```
cd frontend
npm install
npm start
```

#### Notes
Currently uses a dummy prediction "A" for all gestures.

AI/ML model integration is in progress — will replace dummy predictions.

Virtual environments (venv/) and frontend dependencies (node_modules/) are ignored in Git.

Project is structured for easy maintenance, scaling, and deployment.

---

#### Skills & Technologies Demonstrated
Backend: Python, Flask, Flask-CORS, API development

Frontend: React, Webcam capture, Axios for API calls

AI Integration: Placeholder for ML/AI model

Version Control & Deployment: Git, GitHub, modular project structure

---

License
MIT License

---

💡 **Professional Notes for Resume:**  
- Mention this project as **“Under Development”**, showing awareness of project lifecycle.  
- Highlight **full-stack development**, **AI integration**, and **real-time feature implementation**.  
- Mention **modular, deployment-ready architecture** — makes it resume-worthy.  

---
