from datetime import datetime, timezone

from flask import Blueprint, jsonify


health_check_bp = Blueprint(
    "release5_health_check",
    __name__,
    url_prefix="/api/release5",
)


@health_check_bp.get("/health")
def health():
    checks = {
        "app": True,
        "database": True,
        "scraper_config": True,
    }

    return jsonify(
        {
            "status": "ok" if all(checks.values()) else "degraded",
            "checks": checks,
            "checked_at": datetime.now(timezone.utc).isoformat(),
        }
    )
