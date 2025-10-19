from database import Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum




# class User(Base):
#     __tablename__ = "users"
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
#     name = Column(String, nullable=False)
#     contact = Column(String, nullable=False, index=True)
#     address = Column(String, nullable=False)


class News(Base):
    __tablename__ = "news"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    author = Column(String, nullable=False)
    content = Column(String, nullable=False)
    image_link = Column(String, nullable=False)
    