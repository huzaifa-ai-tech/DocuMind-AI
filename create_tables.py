from app.database.database import Base, engine
from app.models.document import Document

Base.metadata.create_all(bind=engine)

print("✅ Database Tables Created")