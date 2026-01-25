def final_score(ml_prob: float, rule_prob: float):
    # ML is the main signal
    final = 0.65 * ml_prob + 0.35 * rule_prob

    if final >= 0.65:
        verdict = "HIGH RISK"
    elif final >= 0.35:
        verdict = "MEDIUM RISK"
    else:
        verdict = "LOW RISK"

    return round(final, 3), verdict
