import os
import ssl
import logging
import certifi
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()

logger = logging.getLogger(__name__)

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    logger.error("MONGODB_URI not found in environment")
    raise RuntimeError("MONGODB_URI not found in environment")

if not (MONGODB_URI.startswith("mongodb://") or MONGODB_URI.startswith("mongodb+srv://")):
    logger.error(f"Invalid MONGODB_URI format. Starts with: {MONGODB_URI[:10]}...")
    raise RuntimeError(
        f"Invalid MONGODB_URI format. It must start with 'mongodb://' or 'mongodb+srv://'."
    )

try:
    # Build an SSL context that enforces TLS 1.2+ (required by MongoDB Atlas)
    ssl_ctx = ssl.create_default_context(cafile=certifi.where())
    ssl_ctx.minimum_version = ssl.TLSVersion.TLSv1_2

    logger.info("Connecting to MongoDB Atlas with TLS 1.2+ SSL context")
    connect(host=MONGODB_URI, tlsCAFile=certifi.where(), tls=True)
    logger.info("MongoDB connection established")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise
