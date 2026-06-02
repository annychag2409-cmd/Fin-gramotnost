from flask import Blueprint, jsonify


learning_report_bp = Blueprint(
    "learning_report",
    __name__,
    url_prefix="/api/release4/learning-report",
)


@learning_report_bp.get("/<user_key>")
def get_learning_report(user_key):
    return jsonify(
        {
            "user_key": user_key,
            "completed_lessons": 0,
            "average_score": 0,
            "items": [],
            "note": "Подключите таблицы прогресса, чтобы отчет наполнялся из базы.",
        }
    )
