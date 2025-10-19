from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

import models, schemas
from database import engine, SessionLocal
import cloudinary
import cloudinary.uploader
import uuid

from models import News
models.Base.metadata.create_all(engine)

cloudinary.config(
    cloudinary_url=os.getenv('CLOUDINARY_URL', 'cloudinary://119213622899343:Ys4fHiTJKoWU76ac48Ly0Te-Tz8@dlg3de1hq')
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/news/", response_model=schemas.NewsResponse)
async def create_news(
    author: str = Form(...),
    content: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Upload image to Cloudinary
    result = cloudinary.uploader.upload(
        image.file,
        folder="news_images",
        public_id=str(uuid.uuid4()),
        overwrite=True
    )
    image_url = result.get("secure_url")

    # Save in DB
    news_item = News(author=author, content=content, image_link=image_url)
    db.add(news_item)
    db.commit()
    db.refresh(news_item)

    return news_item

@app.get("/all", response_model=list[schemas.News])
def getAll(db: Session = Depends(get_db)):
    allNews = db.query(models.News).all()
    
    return allNews