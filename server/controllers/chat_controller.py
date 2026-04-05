from services.gemini_service import get_gemini_response

def handle_message(data):
    # Get message from request
    user_message = data.get("message")

    # Validate input
    if not user_message:
        return {
            "error": "Message is required"
        }

    try:
        # Call Gemini service
        ai_reply = get_gemini_response(user_message)

        return {
            "response": ai_reply
        }

    except Exception as e:
        return {
            "error": str(e)
        }