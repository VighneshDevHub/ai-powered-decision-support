import os
import json
from dotenv import load_dotenv
from openai import OpenAI, BadRequestError

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

# Ordered by preference (newest → safest)
GROQ_MODELS = [
    "llama-3.1-8b-instant",     # fastest, very stable
    "mixtral-8x7b-32768",       # strong reasoning fallback
]

def llm_call_fn(prompt: str) -> dict:
    """
    Calls Groq LLM with automatic model fallback.
    ALWAYS returns parsed JSON or raises a clear error.
    """

    last_error = None

    for model in GROQ_MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a strict JSON generator. "
                            "Return ONLY valid JSON. "
                            "No explanations. No markdown."
                        )
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.2,
            )

            raw = response.choices[0].message.content.strip()
            return json.loads(raw)

        except BadRequestError as e:
            # model deprecated or unavailable → try next
            last_error = e
            continue

        except json.JSONDecodeError:
            raise ValueError(f"Invalid JSON from LLM:\n{raw}")

    # If all models fail
    raise RuntimeError(
        "All Groq models failed. Last error:\n"
        f"{last_error}"
    )


def llm_call_text(prompt: str) -> str:
    """
    Calls Groq LLM for PLAIN TEXT responses.
    Used for chat, classification, summaries.
    """

    last_error = None

    for model in GROQ_MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a helpful AI assistant. "
                            "Answer clearly and concisely."
                        )
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
            )

            return response.choices[0].message.content.strip()

        except BadRequestError as e:
            last_error = e
            continue

    raise RuntimeError(
        "All Groq models failed (text mode). Last error:\n"
        f"{last_error}"
    )