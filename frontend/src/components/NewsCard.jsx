import './NewsCard.css';

function NewsCard({ news }) {
  return (
    <article className="news-card">
      {news.image_link && (
        <div className="news-card-image">
          <img src={news.image_link} alt={`News by ${news.author}`} />
        </div>
      )}
      <div className="news-card-content">
        <p className="news-card-text">{news.content}</p>
        <div className="news-card-footer">
          <span className="news-card-author">By {news.author}</span>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
