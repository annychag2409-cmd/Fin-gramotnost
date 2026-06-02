from flask import Blueprint, jsonify, request


comparison_scenarios_bp = Blueprint(
    "comparison_scenarios",
    __name__,
    url_prefix="/api/release3/comparison",
)


SCENARIO_RULES = {
    "reserve": {
        "title": "Финансовая подушка",
        "recommended_product": "savings",
        "description": "Для резерва важнее доступность денег, чем максимальная ставка.",
    },
    "fixed_purchase": {
        "title": "Покупка в известный срок",
        "recommended_product": "deposit",
        "description": "Для цели с понятной датой удобно сравнить вклады с фиксированной ставкой.",
    },
    "long_term": {
        "title": "Долгосрочный капитал",
        "recommended_product": "investment",
        "description": "Долгий срок позволяет изучать инвестиции, но только после финансовой подушки.",
    },
}


@comparison_scenarios_bp.get("/scenarios")
def list_scenarios():
    return jsonify({"items": SCENARIO_RULES})


@comparison_scenarios_bp.post("/score")
def score_scenario():
    payload = request.get_json(silent=True) or {}
    scenario = payload.get("scenario", "reserve")
    risk_level = payload.get("risk_level", "low")
    result = SCENARIO_RULES.get(scenario, SCENARIO_RULES["reserve"]).copy()

    if risk_level == "high" and scenario == "long_term":
        result["warning"] = "Перед инвестициями проверьте комиссии, налоги и возможную просадку."
    elif risk_level == "low" and result["recommended_product"] == "investment":
        result["warning"] = "При низкой готовности к риску сначала изучите вклад или накопительный счет."
    else:
        result["warning"] = None

    return jsonify(result)
