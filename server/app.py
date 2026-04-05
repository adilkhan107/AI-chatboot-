from flask import Flask
from flask_cors import CORS # type: ignore
from routes.chat_route import chat_bp

app = Flask(__name__)
CORS(app)  # ✅ allow frontend connection

app.register_blueprint(chat_bp)

if __name__ == "__main__":
    app.run(debug=True)