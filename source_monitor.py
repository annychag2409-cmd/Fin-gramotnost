from datetime import datetime, timezone

from flask import Blueprint, jsonify, request


source_monitor_bp = Blueprint(
    "source_monitor",
    __name__,
    url_prefix="/api/release4/sources",
)

_sources = [
    {
        "bank": "Сбер",
        "product": "Вклад",
        "source_url": "https://www.sberbank.ru/",
        "status": "needs_check",
        "checked_at": "не проверено",
    },
    {
        "bank": "Т-Банк",
        "product": "Накопительный счет",
        "source_url": "https://www.tbank.ru/",
        "status": "needs_check",
        "checked_at": "не проверено",
    },
]


@source_monitor_bp.get("")
def list_sources():
    return jsonify({"items": _sources})


@source_monitor_bp.post("/mark")
def mark_source():
    payload = request.get_json(silent=True) or {}
    bank = payload.get("bank")
    status = payload.get("status", "ok")

    for source in _sources:
      if source["bank"] == bank:
          source["status"] = status
          source["checked_at"] = datetime.now(timezone.utc).isoformat()
          return jsonify(source)

    return jsonify({"error": "Source not found"}), 404
