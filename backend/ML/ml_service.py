import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "scam_pipeline.pkl")

pipeline = joblib.load(MODEL_PATH)

def predict_scam_prob(payload: dict) -> float:
    text = payload["title"] + " " + payload.get("description", "")

    X = pd.DataFrame([{
        "text": text,
        "telecommuting": payload["telecommuting"],
        "has_company_logo": payload["has_company_logo"],
        "has_questions": payload["has_questions"],
        "salary_missing": payload["salary_missing"],
        "education_missing": payload["education_missing"],
        "experience_missing": payload["experience_missing"]
    }])


    return float(pipeline.predict_proba(X)[0][1])

