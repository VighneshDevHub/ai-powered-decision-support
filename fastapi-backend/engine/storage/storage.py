import os
import json

BASE_DIR = "storage"
PROCESSED_DIR = os.path.join(BASE_DIR, "processed")
CONTEXT_DIR = os.path.join(BASE_DIR, "context")


def ensure_storage_dirs():
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(CONTEXT_DIR, exist_ok=True)


def _normalize_path(path: str) -> str:
    return path.replace("\\", "/")


def save_processed_json(file_name: str, data: dict):
    ensure_storage_dirs()
    path = os.path.join(PROCESSED_DIR, f"{file_name}.json")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return _normalize_path(path)


def save_context_json(file_name: str, context: dict):
    ensure_storage_dirs()
    path = os.path.join(CONTEXT_DIR, f"{file_name}.json")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(context, f, indent=2)

    return _normalize_path(path)


def load_json(path: str):
    """
    Accept both / and \\ safely
    """
    path = path.replace("/", os.sep)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
