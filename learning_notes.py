from datetime import datetime, timezone

from flask import Blueprint, jsonify, request


learning_notes_bp = Blueprint(
    "learning_notes",
    __name__,
    url_prefix="/api/release3/learning",
)

_notes_storage = {}


def _now_iso():
    return datetime.now(timezone.utc).isoformat()


@learning_notes_bp.get("/notes/<user_key>")
def list_notes(user_key):
    user_notes = [
        note for (stored_user_key, _lesson_id), note in _notes_storage.items()
        if stored_user_key == user_key
    ]
    return jsonify({"items": user_notes})


@learning_notes_bp.put("/notes/<user_key>/<lesson_id>")
def save_note(user_key, lesson_id):
    payload = request.get_json(silent=True) or {}
    note = {
        "user_key": user_key,
        "lesson_id": lesson_id,
        "goal": payload.get("goal", "").strip(),
        "note": payload.get("note", "").strip(),
        "understood": bool(payload.get("understood")),
        "updated_at": _now_iso(),
    }

    _notes_storage[(user_key, lesson_id)] = note
    return jsonify(note)


@learning_notes_bp.delete("/notes/<user_key>/<lesson_id>")
def delete_note(user_key, lesson_id):
    _notes_storage.pop((user_key, lesson_id), None)
    return jsonify({"deleted": True})
