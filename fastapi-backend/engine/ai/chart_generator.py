def generate_chart_config(llm_call_fn, question, context):
    """
    Generates a chart configuration based on the user question and data context.
    """
    prompt = f"""
You are a data visualization expert.
Based on the user's question and the dataset summary, generate a JSON configuration for a chart.

DATASET SUMMARY:
{context}

USER QUESTION:
{question}

RULES:
1. Choose the most appropriate chart type (bar, line, pie, scatter).
2. Use ONLY columns that exist in the dataset.
3. Return STRICT JSON ONLY.

RETURN JSON FORMAT:
{{
  "type": "bar | line | pie | scatter",
  "title": "Chart Title",
  "xAxis": "column_name",
  "yAxis": "column_name",
  "labels": ["label1", "label2"],
  "values": [10, 20],
  "reasoning": "why this chart was chosen"
}}
"""
    return llm_call_fn(prompt)
