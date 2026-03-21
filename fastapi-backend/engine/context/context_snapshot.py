def build_context_snapshot(processed_result: dict) -> dict:

    key_metrics = []
    for m in processed_result["metrics"]:
        if "data" in m:
            key_metrics.append(m["metric"])

    key_insights = []
    for i in processed_result["insights"].get("insights", []):
        key_insights.append(i["insight"])

    return {
        "file_name": processed_result["file_name"],
        "data_confidence": processed_result["data_confidence"],
        "ai_confidence": processed_result["ai_confidence"],
        "key_metrics": key_metrics,
        "key_insights": key_insights
    }
