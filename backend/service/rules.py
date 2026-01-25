def rule_score(payload: dict):
    score = 0.0
    reasons = []

    if payload["salary_missing"]:
        score += 0.15
        reasons.append("Salary information is missing")

    if payload["telecommuting"]:
        score += 0.10
        reasons.append("Remote job posting (commonly abused by scammers)")

    if not payload["has_company_logo"]:
        score += 0.10
        reasons.append("Company logo not provided")

    if payload["education_missing"]:
        score += 0.10
        reasons.append("Education requirements not specified")

    if payload["experience_missing"]:
        score += 0.10
        reasons.append("Experience requirements not specified")

    if not payload["has_questions"]:
        score += 0.05
        reasons.append("No screening questions present")

    # Cap rule score so rules never dominate ML
    return min(score, 0.6), reasons
