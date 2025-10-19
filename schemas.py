from pydantic import BaseModel
from uuid import UUID
from enum import Enum
from datetime import datetime


class NewsResponse(BaseModel):
    id: UUID
    author: str
    content: str
    image_link: str
    
    class Config:
        orm_mode=True
    