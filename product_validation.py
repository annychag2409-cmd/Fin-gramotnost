def validate_calculation_payload(payload, *, min_amount=1, max_months=60):
    errors = {}

    try:
        amount = float(payload.get("amount", 0))
    except (TypeError, ValueError):
        amount = 0
        errors["amount"] = "Сумма должна быть числом."

    try:
        months = int(payload.get("months", 0))
    except (TypeError, ValueError):
        months = 0
        errors["months"] = "Срок должен быть целым числом."

    if "amount" not in errors and amount < min_amount:
        errors["amount"] = f"Минимальная сумма: {min_amount}."

    if "months" not in errors and (months < 1 or months > max_months):
        errors["months"] = f"Срок должен быть от 1 до {max_months} месяцев."

    return {
        "is_valid": not errors,
        "errors": errors,
        "cleaned": {"amount": amount, "months": months},
    }
