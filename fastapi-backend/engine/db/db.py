import os
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not found in environment")

connect(host=MONGODB_URI)
