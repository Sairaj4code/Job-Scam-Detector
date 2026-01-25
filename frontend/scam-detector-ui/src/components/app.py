from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import get_gemini_response
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/ai/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Get response from Gemini
    ai_reply = get_gemini_response(user_message)
    
    return jsonify({"reply": ai_reply})

# Existing routes for report/analyze would go here...
# @app.route('/report', methods=['POST']) ...
# @app.route('/analyze', methods=['POST']) ...

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, port=port)