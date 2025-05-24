from sqlalchemy import Column, Integer, String, MetaData
from sqlalchemy.ext.declarative import declarative_base

# Define a base class for declarative models
Base = declarative_base()

# Define metadata object
# This is useful for creating tables later
metadata = Base.metadata

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"

class UploadedContent(Base):
    __tablename__ = 'uploaded_content'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image_path = Column(String, nullable=False)

    def __repr__(self):
        return f"<UploadedContent(id={self.id}, title='{self.title}')>"
