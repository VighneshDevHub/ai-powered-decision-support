def validate_ai_plan(plan):
    if not isinstance(plan, dict):
        return False

    metrics = plan.get("metrics")
    if not isinstance(metrics, list):
        return False

    for m in metrics:
        if not isinstance(m, dict):
            return False
        if not all(k in m for k in ["name", "type", "columns", "importance", "reason"]):
            return False
        if m["type"] not in ["aggregation", "ratio", "trend", "distribution"]:
            return False
        if m["importance"] not in ["high", "medium", "low"]:
            return False
        if not isinstance(m["columns"], list):
            return False

    return True
