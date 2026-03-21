def generate_top_insights(llm_call_fn, context, metrics):
    prompt = f"""
You are a decision analyst.

Dataset confidence: {context["data_confidence"]}%

Metrics:
{metrics}

Return STRICT JSON:
{{
  "insights": [
    {{
      "insight": "...",
      "risk": "...",
      "action": "..."
    }}
  ]
}}
"""
    return llm_call_fn(prompt)
