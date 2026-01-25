from flask import Blueprint, request, jsonify
from datetime import datetime
import json
import os

report_bp = Blueprint("report", __name__)

REPORTS_FILE = "scam_reports.json"


@report_bp.route("/report", methods=["POST"])
def report_scam():
    data = request.get_json()

    report = {
        "id": int(datetime.utcnow().timestamp() * 1000),
        "timestamp": datetime.utcnow().isoformat(),
        "category": data.get("category"),
        "companyName": data.get("companyName"),
        "contactEmail": data.get("contactEmail"),
        "details": data.get("details"),
        "ip": request.remote_addr
    }

    if os.path.exists(REPORTS_FILE):
        with open(REPORTS_FILE, "r") as f:
            reports = json.load(f)
    else:
        reports = []

    reports.append(report)

    with open(REPORTS_FILE, "w") as f:
        json.dump(reports, f, indent=2)

    return jsonify({"status": "ok"}), 200
