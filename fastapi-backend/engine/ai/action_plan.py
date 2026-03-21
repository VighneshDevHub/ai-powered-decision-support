def generate_30_day_plan(llm_call_fn, metrics, data_confidence):
    prompt = f"""
You are a business strategy advisor.

Data confidence: {data_confidence}%

Metrics (JSON):
{metrics}

TASK:
Create a practical 30-day action plan.

RULES:
- Max 5 bullet points
- Actions must be concrete
- No long explanations
- No emojis

RETURN STRICT JSON ONLY:
{{
  "action_plan_30_days": [
    "Action 1",
    "Action 2",
    "Action 3"
  ]
}}
"""
    return llm_call_fn(prompt)
