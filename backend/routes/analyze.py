from flask import Blueprint, request, jsonify
from backend.ML.ml_service import predict_scam_prob
from backend.service.rules import rule_score
from backend.service.scoring import final_score

analyze_bp = Blueprint("analyze", __name__)

@analyze_bp.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    required = [
        "title",
        "description",
        "telecommuting",
        "has_company_logo",
        "has_questions",
        "salary_missing",
        "education_missing",
        "experience_missing"
    ]

    for key in required:
        if key not in data:
            return jsonify({"error": f"{key} is required"}), 400

    # ML score
    ml_prob = predict_scam_prob(data)

    # Rule-based score
    rule_prob, reasons = rule_score(data)

    # Final score
    final, verdict = final_score(ml_prob, rule_prob)

    return jsonify({
        "ml_probability": round(ml_prob, 3),
        "rule_score": round(rule_prob, 3),
        "final_score": final,
        "verdict": verdict,
        "reasons": reasons
    })
