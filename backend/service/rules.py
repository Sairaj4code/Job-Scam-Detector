import re

# Scam indicator keywords
FEE_KEYWORDS = [
    "registration fee",
    "training fee",
    "application fee",
    "refundable deposit",
    "pay to apply",
    "security deposit"
]

URGENCY_KEYWORDS = [
    "urgent",
    "immediate",
    "limited slots",
    "apply now",
    "hurry",
    "last chance"
]

NO_INTERVIEW_KEYWORDS = [
    "no interview",
    "direct selection",
    "direct offer",
    "no screening",
    "no experience required"
]

FREE_EMAIL_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com"
]


def detect_rules(job_text: str, email: str = None):
    """
    Applies rule-based scam detection.
    Returns:
        rule_score (int)
        reasons (list of strings)
    """
    text = job_text.lower()
    score = 0
    reasons = []

    # Fee-related checks
    for kw in FEE_KEYWORDS:
        if kw in text:
            score += 30
            reasons.append("Mentions upfront payment or fees")
            break

    # Urgency language
    for kw in URGENCY_KEYWORDS:
        if kw in text:
            score += 10
            reasons.append("Uses urgency-based language")
            break

    # No interview / direct offer
    for kw in NO_INTERVIEW_KEYWORDS:
        if kw in text:
            score += 15
            reasons.append("No interview or screening process mentioned")
            break

    # Email domain check
    if email:
        domain_match = re.search(r"@([\w\.-]+)", email)
        if domain_match:
            domain = domain_match.group(1).lower()
            if domain in FREE_EMAIL_DOMAINS:
                score += 20
                reasons.append("Uses free email provider")

    return score, reasons
