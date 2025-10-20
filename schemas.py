from pydantic import BaseModel
from uuid import UUID
from enum import Enum
from datetime import datetime
from typing import Optional


class NewsResponse(BaseModel):
    id: UUID
    author: str
    content: str
    image_link: Optional[str] = None

    class Config:
        orm_mode=True

class News(BaseModel):
    id: UUID
    author: str
    content: str
    image_link: Optional[str] = None

    class Config:
        orm_mode=True
    