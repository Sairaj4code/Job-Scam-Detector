import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
print("API KEY:", os.getenv("GEMINI_API_KEY"))

def get_gemini_response(user_message):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=user_message
            

        )
        return response.text
    except Exception as e:
        print("Gemini Error:", e)
        print("API KEY:", os.getenv("GEMINI_API_KEY"))

        return "AI service is temporarily unavailable."
