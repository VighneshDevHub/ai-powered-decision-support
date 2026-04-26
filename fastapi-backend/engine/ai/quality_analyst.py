def generate_quality_suggestions(llm_call_fn, context):
    """
    Analyzes the dataset context and suggests data quality improvements.
    """
    prompt = f"""
You are a Data Quality Engineer.
Analyze the following dataset summary and identify potential data quality issues or improvements.

DATASET SUMMARY:
{context}

Consider:
1. Missing values and how to handle them.
2. Inconsistent date formats or column names.
3. Potential outliers in numeric columns.
4. Categorical data that might need normalization (e.g., 'USA' vs 'United States').
5. Redundant columns or low-variance features.

Return STRICT JSON in this format:
{{
  "quality_score": 0-100,
  "suggestions": [
    {{
      "issue": "short description of the issue",
      "severity": "high | medium | low",
      "recommendation": "how to fix it",
      "benefit": "why fixing it helps decision making"
    }}
  ]
}}
"""
    return llm_call_fn(prompt)
