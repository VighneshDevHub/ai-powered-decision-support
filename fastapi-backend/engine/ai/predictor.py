def generate_predictions(llm_call_fn, metrics, context):
    """
    Generates predictive insights based on existing metrics and context.
    """
    prompt = f"""
You are a predictive analyst.
Based on the following dataset summary and calculated metrics, predict future trends or potential outcomes.

DATASET SUMMARY:
{context}

CALCULATED METRICS:
{metrics}

Focus on:
1. Short-term forecasts (next 30-90 days).
2. Potential risks that might arise based on current trends.
3. Opportunities for growth or optimization.

Return STRICT JSON in this format:
{{
  "predictions": [
    {{
      "target": "what is being predicted (e.g., Sales, User Growth)",
      "trend": "up | down | stable",
      "confidence": "high | medium | low",
      "reasoning": "why you expect this outcome",
      "impact": "business impact of this prediction"
    }}
  ]
}}
"""
    return llm_call_fn(prompt)
