from engine.llm.llm_groq import llm_call_text

def classify_question(question: str) -> str:
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
    return llm_call_text(prompt).lower()
