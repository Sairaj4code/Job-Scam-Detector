def calculate_final_score(
    rule_score: int,
    ml_probability: float,
    web_score: int,
    rule_reasons: list,
    web_reasons: list
):
    """
    Combines all signals to calculate final risk score and verdict.

    Inputs:
        rule_score (int): Score from rule-based detection (0–40)
        ml_probability (float): Scam probability from ML model (0.0–1.0)
        web_score (int): Score from web verification (0–30)
        rule_reasons (list): Reasons from rule checks
        web_reasons (list): Reasons from web checks

    Returns:
        dict with:
            final_score (int)
            verdict (str)
            reasons (list)
    """

    # Convert ML probability to score (max 40)
    ml_score = int(ml_probability * 40)

    # Combine scores
    final_score = rule_score + ml_score + web_score

    # Cap score at 100
    final_score = min(final_score, 100)

    # Determine verdict
    if final_score <= 30:
        verdict = "SAFE"
    elif final_score <= 60:
        verdict = "SUSPICIOUS"
    else:
        verdict = "HIGH RISK"

    # Combine reasons
    reasons = []
    reasons.extend(rule_reasons)
    reasons.extend(web_reasons)

    # Add ML-based explanation (optional but nice)
    if ml_probability >= 0.7:
        reasons.append("NLP model strongly indicates scam-like language")
    elif ml_probability >= 0.4:
        reasons.append("NLP model finds suspicious language patterns")

    return {
        "final_score": final_score,
        "verdict": verdict,
        "reasons": reasons
    }
