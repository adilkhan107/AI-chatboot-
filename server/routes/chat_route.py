from flask import Blueprint, request, jsonify
from controllers.chat_controller import handle_message # type: ignore

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    result = handle_message(data)

    return jsonify(result)