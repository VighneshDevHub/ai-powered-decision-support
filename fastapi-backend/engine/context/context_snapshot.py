def build_context_snapshot(processed_result: dict) -> dict:

    key_metrics = []
    for m in processed_result["metrics"]:
        if "data" in m:
            key_metrics.append(m["metric"])

    key_insights = []
    # insights is already a list of dicts (from process_and_store.py)
    for i in processed_result["insights"]:
        if isinstance(i, dict) and "insight" in i:
            key_insights.append(i["insight"])
        elif isinstance(i, str):
            key_insights.append(i)

    return {
        "file_name": processed_result["file_name"],
        "data_confidence": processed_result["data_confidence"],
        "ai_confidence": processed_result["ai_confidence"],
        "key_metrics": key_metrics,
        "key_insights": key_insights
    }
