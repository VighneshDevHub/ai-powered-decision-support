import os
import json
import math

BASE_DIR = "storage"
PROCESSED_DIR = os.path.join(BASE_DIR, "processed")
CONTEXT_DIR = os.path.join(BASE_DIR, "context")


def _sanitize_for_json(obj):
    """
    Recursively replaces NaN, Inf, -Inf with None/null so json.dump doesn't crash.
    """
    if isinstance(obj, dict):
        return {k: _sanitize_for_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_sanitize_for_json(x) for x in obj]
    elif isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None
    return obj


def ensure_storage_dirs():
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(CONTEXT_DIR, exist_ok=True)


def _normalize_path(path: str) -> str:
    return path.replace("\\", "/")


def save_processed_json(file_name: str, data: dict):
    ensure_storage_dirs()
    path = os.path.join(PROCESSED_DIR, f"{file_name}.json")

    sanitized_data = _sanitize_for_json(data)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(sanitized_data, f, indent=2)

    return _normalize_path(path)


def save_context_json(file_name: str, context: dict):
    ensure_storage_dirs()
    path = os.path.join(CONTEXT_DIR, f"{file_name}.json")

    sanitized_context = _sanitize_for_json(context)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(sanitized_context, f, indent=2)

    return _normalize_path(path)


def load_json(path: str):
    """
    Accept both / and \\ safely
    """
    path = path.replace("/", os.sep)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
