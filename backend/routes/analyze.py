from flask import Blueprint, request, jsonify

from backend.service.rules import detect_rules
from backend.service.scoring import calculate_final_score

analyze_bp = Blueprint("analyze", __name__)


@analyze_bp.route("/analyze", methods=["POST"])
def analyze_job():
    data = request.get_json()

    if not data or "job_text" not in data:
        return jsonify({"error": "job_text is required"}), 400

    job_text = data["job_text"]
    email = data.get("email")  # optional

    # 1. Rule-based detection
    rule_score, rule_reasons = detect_rules(job_text, email)

    # 2. Dummy ML probability (will be replaced later)
    ml_probability = 0.5

    # 3. Dummy web verification score
    web_score = 0
    web_reasons = []

    # 4. Final scoring
    result = calculate_final_score(
        rule_score=rule_score,
        ml_probability=ml_probability,
        web_score=web_score,
        rule_reasons=rule_reasons,
        web_reasons=web_reasons
    )

    return jsonify(result), 200
