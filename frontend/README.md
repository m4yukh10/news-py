# News Portal Frontend

React frontend for the News Portal application.

## Features

- View all news articles in a responsive grid
- Post new articles with image upload
- Clean, minimalistic design with black, white, and blue theme
- Responsive layout for mobile and desktop

## Tech Stack

- React 19
- Vite 7
- Cloudinary for image hosting

## Development

```bash
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## API Integration

The frontend connects to the FastAPI backend at http://localhost:8000

Endpoints:
- `GET /all` - Fetch all news articles
- `POST /news/` - Create new article (multipart form data)
