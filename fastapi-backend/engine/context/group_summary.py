def generate_group_summary(llm_call_fn, dataset_results):
    compact_summary = []

    for ds in dataset_results:
        compact_summary.append({
            "data_confidence": ds["data_confidence"],
            "ai_confidence": ds["ai_confidence"],
            "metric_names": [m["metric"] for m in ds["metrics"] if "data" in m]
        })

    prompt = f"""
You are an executive decision analyst.

You are given multiple independent dataset analyses.

DATASET SUMMARIES (JSON):
{compact_summary}

TASKS:
1. Identify cross-dataset patterns
2. Highlight top strategic risks across datasets
3. Suggest executive focus areas

RULES:
- Do NOT invent metrics
- Do NOT repeat per-dataset insights
- Max 3 items per section

RETURN STRICT JSON ONLY:
{{
  "group_insights": [
    "Insight 1",
    "Insight 2"
  ],
  "cross_dataset_risks": [
    "Risk 1",
    "Risk 2"
  ],
  "recommended_focus_areas": [
    "Focus 1",
    "Focus 2"
  ]
}}
"""

    return llm_call_fn(prompt)
