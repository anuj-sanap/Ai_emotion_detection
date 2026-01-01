import os
import json
import base64
from datetime import datetime

import numpy as np
import tensorflow as tf
import cv2
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# =========================
# TENSORFLOW PERFORMANCE FIX
# =========================
tf.config.threading.set_intra_op_parallelism_threads(2)
tf.config.threading.set_inter_op_parallelism_threads(2)
tf.keras.backend.set_learning_phase(0)

# =========================
# DEBUG LOGGING
# =========================
DEBUG_LOG_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    ".cursor",
    "debug.log",
)

def debug_log(session_id, run_id, hypothesis_id, location, message, data):
    try:
        log_entry = {
            "id": f"log_{int(datetime.now().timestamp() * 1000)}",
            "timestamp": int(datetime.now().timestamp() * 1000),
            "location": location,
            "message": message,
            "data": data,
            "sessionId": session_id,
            "runId": run_id,
            "hypothesisId": hypothesis_id,
        }
        os.makedirs(os.path.dirname(DEBUG_LOG_PATH), exist_ok=True)
        with open(DEBUG_LOG_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(log_entry) + "\n")
    except Exception:
        pass

# =========================
# EMOTION LABELS
# =========================
EMOTIONS = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Sad",
    "Surprise",
    "Neutral",
]

# =========================
# LOAD FULL MODEL
# =========================
MODEL_PATH = "facialemotionmodel.h5"

model = tf.keras.models.load_model(MODEL_PATH, compile=False)

# 🔥 MODEL WARM-UP (CRITICAL)
dummy = np.zeros((1, 48, 48, 1), dtype=np.float32)
model.predict(dummy, verbose=0)

# =========================
# LOAD FACE CASCADE ONCE
# =========================
FACE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# =========================
# FASTAPI APP
# =========================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# REQUEST MODEL
# =========================
class FrameRequest(BaseModel):
    frame: str

# =========================
# FACE DETECTION
# =========================
def detect_and_crop_face(image: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = FACE_CASCADE.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    if len(faces) == 0:
        return image

    x, y, w, h = max(faces, key=lambda r: r[2] * r[3])

    pad = int(0.1 * max(w, h))
    x1 = max(0, x - pad)
    y1 = max(0, y - pad)
    x2 = min(image.shape[1], x + w + pad)
    y2 = min(image.shape[0], y + h + pad)

    return image[y1:y2, x1:x2]

# =========================
# PREPROCESSING
# =========================
def preprocess_face(image: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray, (48, 48), interpolation=cv2.INTER_AREA)
    normalized = resized.astype(np.float32) * (1.0 / 255.0)
    return normalized.reshape(1, 48, 48, 1)

# =========================
# PREDICTION ENDPOINT
# =========================
@app.post("/predict")
def predict_emotion(data: FrameRequest):
    try:
        frame_data = data.frame.split(",", 1)[-1]
        img_bytes = base64.b64decode(frame_data)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if image is None:
            return {"emotion": "Error", "confidence": 0}

        face_img = detect_and_crop_face(image)
        face = preprocess_face(face_img)

        preds = model(face, training=False).numpy()[0]
        probs = preds / preds.sum()

        idx = int(np.argmax(probs))

        return {
            "emotion": EMOTIONS[idx],
            "confidence": round(float(probs[idx]) * 100, 2),
        }

    except Exception as e:
        return {
            "emotion": "Error",
            "confidence": 0,
            "error": str(e),
        }
