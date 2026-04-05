from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


def get_gemini_response(message):
    try:
        # 🔹 Add instruction for 20 words
        prompt = f"Answer in exactly in 1 word: {message}"

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        text = response.text

        # 🔹 Extra safety (limit to 20 words)
        words = text.split()
        limited_text = " ".join(words[:20])

        return limited_text

    except Exception as e:
        return f"Error: {str(e)}"