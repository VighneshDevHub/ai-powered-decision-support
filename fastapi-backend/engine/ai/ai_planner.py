from engine.utils.schema_validation import validate_ai_plan

def ask_ai_what_to_calculate(ai_context, llm_call_fn, retries=2):
    """
    Asks the LLM to decide WHAT metrics should be calculated.
    Returns a STRICT JSON plan that the code can execute.
    """

    prompt = f"""
You are a senior data analyst designing a metric calculation plan.

You are given a dataset summary in JSON.
You must decide WHICH metrics are meaningful to compute.

DATASET SUMMARY (JSON):
{ai_context}

IMPORTANT RULES (DO NOT VIOLATE):
1. Use ONLY columns that exist in the dataset
2. Do NOT invent column names
3. If date_columns is empty, DO NOT suggest any trend metrics
4. Prefer SIMPLE and ROBUST metrics
5. You are NOT allowed to calculate numbers
6. You must return STRICT JSON ONLY (no explanation, no text)

ALLOWED METRIC TYPES:
- aggregation   → mean / min / max of ONE numeric column
- ratio         → division between TWO numeric columns
- trend         → direction over time (ONLY if date column exists)
- distribution  → value frequency of ONE column (categorical or numeric)

RETURN JSON IN THIS EXACT FORMAT:
{{
  "metrics": [
    {{
      "name": "short_snake_case_metric_name",
      "type": "aggregation | ratio | trend | distribution",
      "columns": ["colA"] OR ["colA", "colB"],
      "importance": "high | medium | low",
      "reason": "why this metric matters"
    }}
  ]
}}

GUIDELINES:
- Choose 2–4 metrics maximum
- If the dataset has many numeric columns, prioritize the most informative ones
- If the dataset is non-business (e.g., music, products), adapt metric choice accordingly
"""

    for attempt in range(retries):
        ai_plan = llm_call_fn(prompt)

        if validate_ai_plan(ai_plan):
            return ai_plan

    numeric_cols = ai_context.get("numeric_columns", [])

    if numeric_cols:
        return {
            "metrics": [
                {
                    "name": "default_numeric_summary",
                    "type": "aggregation",
                    "columns": [numeric_cols[0]],
                    "importance": "medium",
                    "reason": "Fallback metric due to invalid AI response"
                }
            ]
        }

    return { "metrics": [] }


