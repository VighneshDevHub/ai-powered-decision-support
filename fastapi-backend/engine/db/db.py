import os
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not found in environment")

if not (MONGODB_URI.startswith("mongodb://") or MONGODB_URI.startswith("mongodb+srv://")):
    raise RuntimeError(
        f"Invalid MONGODB_URI format. It must start with 'mongodb://' or 'mongodb+srv://'. "
        f"Current value starts with: {MONGODB_URI[:10]}..."
    )

connect(host=MONGODB_URI)
