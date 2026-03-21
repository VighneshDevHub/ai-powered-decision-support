def classify_question(llm_call_fn, question):
    prompt = f"""
Classify this question into ONE category:
- explanation
- recommendation
- visualization
- prediction

Question:
{question}

Return ONE WORD ONLY.
"""
    return llm_call_fn(prompt).strip().lower()
  