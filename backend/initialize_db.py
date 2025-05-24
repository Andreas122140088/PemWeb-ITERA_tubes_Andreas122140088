import os
import sys

from sqlalchemy import create_engine

# Add the backend directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from models import metadata

# Get the database URL from the development.ini file
# In a real application, you might use a more robust way to load settings
DATABASE_URL = "postgresql://root:root@localhost:5432/pemweb_UTS" # Ganti jika URL di development.ini berbeda

def initialize_db():
    engine = create_engine(DATABASE_URL)
    metadata.create_all(engine)
    print("Database tables created!")

if __name__ == '__main__':
    initialize_db()
