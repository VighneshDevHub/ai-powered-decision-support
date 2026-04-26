from engine.utils.calculators import *


def execute_metrics(df, ai_plan, ai_context):

    results = []
    date_col = ai_context["date_columns"][0] if ai_context["date_columns"] else None

    # ai_plan should be a dict with a "metrics" key, but LLMs sometimes return a list directly
    plan_metrics = []
    if isinstance(ai_plan, dict):
        plan_metrics = ai_plan.get("metrics", [])
    elif isinstance(ai_plan, list):
        plan_metrics = ai_plan

    for m in plan_metrics:
        if not isinstance(m, dict):
            continue
            
        name = m.get("name", "Unknown Metric")
        mtype = m.get("type", "unknown")
        cols = m.get("columns", [])

        try:
 
            if mtype == "aggregation":
                stats = calculate_aggregation(df, cols[0])
                if not isinstance(stats, dict) or not stats:
                    raise ValueError(f"No numeric data found in column '{cols[0]}'")
                
                results.append({
                    "metric": name,
                    "type": mtype,
                    "chart": "bar",
                    "data": {
                        "labels": list(stats.keys()),
                        "values": list(stats.values())
                    },
                    "importance": m.get("importance", "medium"),
                    "derived_from": cols,
                    "ai_reason": m.get("reason", "")
                })

            elif mtype == "distribution":
                dist = calculate_distribution(df, cols[0])
                results.append({
                    "metric": name,
                    "type": mtype,
                    "chart": "pie",
                    "data": {
                        "labels": list(dist.keys()),
                        "values": list(dist.values())
                    },
                    "importance": m.get("importance", "medium"),
                    "derived_from": cols,
                    "ai_reason": m.get("reason", "")
                })

            elif mtype == "ratio":
                value = calculate_ratio(df, cols[0], cols[1])
                results.append({
                    "metric": name,
                    "type": mtype,
                    "chart": "bar",
                    "data": {
                        "labels": [name],
                        "values": [value]
                    },
                    "importance": m.get("importance", "medium"),
                    "derived_from": cols,
                    "ai_reason": m.get("reason", "")
                })

            elif mtype == "trend":
                trend = calculate_trend(df, cols[0], date_col)

                trend_value = 1 if trend == "up" else -1 if trend == "down" else 0

                results.append({
                    "metric": name,
                    "type": mtype,
                    "chart": "line",
                    "data": {
                        "labels": ["trend"],
                        "values": [trend_value]
                    },
                    "importance": m.get("importance", "medium"),
                    "derived_from": cols,
                    "ai_reason": m.get("reason", "")
                })

        except Exception as e:
            results.append({
                "metric": name,
                "type": mtype,
                "error": str(e),
                "importance": m.get("importance"),
                "derived_from": cols,
                "ai_reason": m.get("reason")
            })

    return results

