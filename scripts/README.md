# Python Backend for Facial Expression Prediction

This small FastAPI app loads a Keras `.h5` model and exposes a `/predict` endpoint.

Requirements

- Place `model.h5` in this `scripts/` folder (already present).
- Python 3.8+ recommended.

Install and run

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the server:

```powershell
uvicorn backend_api:app --host 0.0.0.0 --port 8000
```

4. The Next.js app will POST a JSON body with `{ image: "data:image/png;base64,..." }` to `http://localhost:8000/predict`.

Notes

- The script loads `model.h5` using a script-relative path, so keep `model.h5` in this folder.
- If your model expects a different input size or channels, update the preprocessing in `backend_api.py`.
