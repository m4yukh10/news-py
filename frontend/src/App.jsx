import { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import NewsForm from './components/NewsForm';
import './App.css';

const API_URL = 'http://localhost:8000';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/all`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/news/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchNews();
        setShowForm(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting news:', error);
      return false;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">News Portal</h1>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Post News'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {showForm && (
            <NewsForm
              onSubmit={handleNewsSubmit}
              onCancel={() => setShowForm(false)}
            />
          )}

          {loading ? (
            <div className="loading">Loading news...</div>
          ) : (
            <NewsList news={news} />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 News Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
