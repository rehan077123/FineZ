import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

async def check():
    load_dotenv(Path(__file__).parent / ".env")
    mongo_url = os.environ.get("MONGO_URI")
    client = AsyncIOMotorClient(mongo_url)
    db = client["finez_db"]
    doc = await db.products.find_one({})
    if doc:
        print(f"ID:{doc['id']}")
    client.close()

if __name__ == "__main__":
    asyncio.run(check())
