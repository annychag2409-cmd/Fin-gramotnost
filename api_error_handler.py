from flask import jsonify


def register_release5_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "bad_request", "message": str(error)}), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "not_found", "message": "Ресурс не найден."}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "server_error", "message": "Внутренняя ошибка сервера."}), 500
