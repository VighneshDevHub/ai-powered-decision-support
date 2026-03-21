from engine.utils.calculators import *


def execute_metrics(df, ai_plan, ai_context):

    results = []
    date_col = ai_context["date_columns"][0] if ai_context["date_columns"] else None

    for m in ai_plan["metrics"]:
        name = m["name"]
        mtype = m["type"]
        cols = m["columns"]

        try:
 
            if mtype == "aggregation":
                stats = calculate_aggregation(df, cols[0])
                results.append({
                    "metric": name,
                    "type": mtype,
                    "chart": "bar",
                    "data": {
                        "labels": list(stats.keys()),
                        "values": list(stats.values())
                    },
                    "importance": m["importance"],
                    "derived_from": cols,
                    "ai_reason": m["reason"]
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
                    "importance": m["importance"],
                    "derived_from": cols,
                    "ai_reason": m["reason"]
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
                    "importance": m["importance"],
                    "derived_from": cols,
                    "ai_reason": m["reason"]
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
                    "importance": m["importance"],
                    "derived_from": cols,
                    "ai_reason": m["reason"]
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

