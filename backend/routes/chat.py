from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

chat_bp = Blueprint("chat", __name__)

api_key = os.getenv("GEMINI_API_KEY")

SYSTEM_PROMPT = """You are ScamShield AI, an expert assistant specialized in detecting and preventing job scams.
Your expertise includes:
- Identifying common job scam tactics and red flags
- Analyzing suspicious job postings and offers
- Providing advice on internship and employment safety
- Explaining what legitimate companies do and don't do

When users ask about suspicious job offers or job safety:
1. Be direct and clear about red flags
2. Provide actionable advice
3. Explain why something might be a scam
4. Suggest verification methods

Keep responses concise but helpful. Focus on practical guidance.
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
