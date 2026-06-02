from datetime import datetime, timezone

from flask import Blueprint, jsonify, request


learning_backup_bp = Blueprint(
    "learning_backup",
    __name__,
    url_prefix="/api/release5/learning-backup",
)

_backups = {}


@learning_backup_bp.post("/<user_key>")
def save_backup(user_key):
    payload = request.get_json(silent=True) or {}
    backup = {
        "user_key": user_key,
        "payload": payload,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    _backups.setdefault(user_key, []).insert(0, backup)
    return jsonify(backup), 201


@learning_backup_bp.get("/<user_key>/latest")
def latest_backup(user_key):
    items = _backups.get(user_key, [])
    if not items:
        return jsonify({"error": "Backup not found"}), 404
    return jsonify(items[0])
