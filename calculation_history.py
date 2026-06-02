
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request


calculation_history_bp = Blueprint(
    "calculation_history",
    __name__,
    url_prefix="/api/release4/history",
)

_history_storage = {}


def _now_iso():
    return datetime.now(timezone.utc).isoformat()


@calculation_history_bp.get("/<user_key>")
def list_history(user_key):
    return jsonify({"items": _history_storage.get(user_key, [])})


@calculation_history_bp.post("/<user_key>")
def add_history_item(user_key):
    payload = request.get_json(silent=True) or {}
    item = {
        "product_id": payload.get("product_id"),
        "product_title": payload.get("product_title", "Финансовый продукт"),
        "amount": float(payload.get("amount", 0)),
        "months": int(payload.get("months", 0)),
        "annual_rate": float(payload.get("annual_rate", 0)),
        "profit": float(payload.get("profit", 0)),
        "total": float(payload.get("total", 0)),
        "created_at": _now_iso(),
    }

    _history_storage.setdefault(user_key, []).insert(0, item)
    _history_storage[user_key] = _history_storage[user_key][:20]
    return jsonify(item), 201


@calculation_history_bp.delete("/<user_key>")
def clear_history(user_key):
    _history_storage[user_key] = []
    return jsonify({"cleared": True})
