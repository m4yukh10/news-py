from fastapi import FastAPI, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import os
from fastapi.middleware.cors import CORSMiddleware
import models, schemas
from database import engine, SessionLocal
import cloudinary
import cloudinary.uploader
import uuid
from dotenv import load_dotenv


from models import News
models.Base.metadata.create_all(engine)



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
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

load_dotenv()        
config = cloudinary.config(secure=True)

@app.post("/news", response_model=schemas.NewsResponse)
async def create_news(
    author: str = Form(...),
    content: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    contents = await image.read()
    # Upload image to Cloudinary
    
    upload_response = cloudinary.uploader.upload(contents, resource_type="image")
    image_url = upload_response["secure_url"]    
    # Save in DB
    news_item = News(author=author, content=content, image_link=image_url)
    db.add(news_item)
    db.commit()
    db.refresh(news_item)

    return news_item

@app.get("/all", response_model=list[schemas.NewsResponse])
def getAll(db: Session = Depends(get_db)):
    allNews = db.query(models.News).all()
    
    return allNews
