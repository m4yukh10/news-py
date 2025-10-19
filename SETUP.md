# News Application Setup

## Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the FastAPI backend:
```bash
uvicorn main:app --reload
```

The backend will run on http://localhost:8000

## Frontend Setup

1. Install Node.js dependencies (if not already installed):
```bash
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Click "Post News" to create a new article
3. Fill in your name, article content, and upload an image
4. Click "Publish News" to submit
5. Your article will appear on the main page

## API Endpoints

- `POST /news/` - Create a new news article (requires: author, content, image)
- `GET /all` - Get all news articles
