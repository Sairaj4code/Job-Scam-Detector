from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

chat_bp = Blueprint("chat", __name__)

api_key = os.getenv("GEMINI_API_KEY")

SYSTEM_PROMPT = """You are ScamShield AI.
You analyze job offers and messages for scam risk.

General rules:
- Use plain text only.
- Do NOT use markdown, bullets, emojis, or special characters.
- Do NOT highlight text.
- Be direct and practical.

Response length rules:
- By default, keep replies under 5 short lines.
- If the user explicitly asks for an explanation, why, or how:
  - You may explain briefly in 6–10 short lines.
  - Stay factual and concise.
  - Avoid unnecessary details.

When a message is suspicious:
- Clearly state whether it is likely a scam.
- Give concrete reasons.
- Suggest clear next steps.

When a message seems legitimate:
- Say it appears legitimate.
- Suggest at least one verification step.

Do not add disclaimers.
Do not repeat the user message.
"""

client = genai.Client(api_key=api_key) if api_key else None


@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message")

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        if not client:
            return jsonify({
                "reply": "AI service is not configured. Please set up the GEMINI_API_KEY."
            }), 500

        full_message = f"{SYSTEM_PROMPT}\n\nUser: {user_message}"

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=full_message
        )

        return jsonify({"reply": response.text}), 200

    except Exception as e:
        print("Chat error:", e)
        return jsonify({
            "reply": "I encountered an error processing your request."
        }), 500
