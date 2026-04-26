def calculate_ai_confidence(data_confidence: float, metrics: list) -> int:
    if not metrics:
        return 0

    total = len(metrics)

    valid = 0
    weighted_score = 0
    max_weight = 0

    for m in metrics:
        if not isinstance(m, dict):
            continue
            
        importance = m.get("importance", "medium")

        weight = {
            "high": 1.0,
            "medium": 0.7,
            "low": 0.4
        }.get(importance, 0.7)

        max_weight += weight

        # Correctly access nested data values from executor output
        data_obj = m.get("data", {})
        values = data_obj.get("values", [])

        if values:
            valid += 1
            weighted_score += weight

    metric_quality = weighted_score / max_weight if max_weight > 0 else 0

    score = (
        0.6 * (data_confidence / 100) +
        0.4 * metric_quality
    ) * 100

    return round(min(max(score, 0), 100))
