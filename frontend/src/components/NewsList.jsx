import NewsCard from './NewsCard';
import './NewsList.css';

function NewsList({ news }) {
  if (news.length === 0) {
    return (
      <div className="empty-state">
        <h2>No news articles yet</h2>
        <p>Be the first to post a news article!</p>
      </div>
    );
  }

  return (
    <div className="news-list">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}

export default NewsList;
