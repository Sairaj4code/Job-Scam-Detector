from flask import Flask
from routes.analyze import analyze_bp
from flask_cors import CORS 
from routes.report import report_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register blueprints
    app.register_blueprint(analyze_bp)
    app.register_blueprint(report_bp)


    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
