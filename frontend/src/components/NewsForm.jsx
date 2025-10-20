import { useState } from 'react';
import './NewsForm.css';

function NewsForm({ onSubmit, onCancel }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!author.trim() || !content.trim()) {
      setError('Please fill in author and content fields');
      return;
    }

    if (!image) {
      setError('Please upload an image');
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('author', author);
    formData.append('content', content);
    formData.append('image', image);

    const success = await onSubmit(formData);

    if (success) {
      setAuthor('');
      setContent('');
      setImage(null);
      setImagePreview(null);
    } else {
      setError('Failed to submit news. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <div className="news-form-wrapper">
      <div className="news-form-card">
        <h2>Post New Article</h2>
        <form onSubmit={handleSubmit} className="news-form">
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">News Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your news article..."
              rows="8"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={submitting}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Publishing...' : 'Publish News'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsForm;
