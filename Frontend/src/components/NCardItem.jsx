import React from 'react';
import './style/nCardItem.css';

 const NCardItem = (props) => {
  let { title, description, imageUrl, author, date, source, isExpanded, onExpand, onClose, index } = props;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const handleReadMoreClick = () => {
    onExpand(index); // Notify the parent component to expand this card
  };

  const handleReadLessClick = () => {
    onClose(); // Notify the parent to close the expanded card
  };

  return (
    <div
      className={`card-item-container my-3 ${isExpanded ? 'expanded-overlay-item' : ''}`}
      style={isExpanded ? { width: '100%' } : {}} // Ensure it takes full width in overlay
    >
      <div className="card card-modern">
        <div className="image-container">
          <img
            src={imageUrl}
            className="card-img-top rounded-top"
            alt={title}

          />
          {source && source.name && (
            <span className="badge bg-primary source-badge rounded-pill">{source.name}</span>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {!isExpanded && (
            <p className="card-text text-secondary limited-description">
              {description ? description.slice(0, 100) : "Content Not Available Right Now"}...
            </p>
          )}

          {isExpanded && (
            <p className="card-text full-description">
              {/* {content || "Full content not available for this article."} */}
              {description}
            </p>
          )}
          <div className="card-footer-info">
            <small className="text-muted">By {author ? author : "Unknown"}</small>
            <small className="text-muted">{formattedDate}</small>
          </div>
          {!isExpanded ? (
            <button onClick={handleReadMoreClick} className="btn btn-sm btn-outline-info read-more-btn">
              Read More
            </button>
          ) : (
            <button onClick={handleReadLessClick} className="btn btn-sm btn-outline-danger read-less-btn">
              Read Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
 };

 export default NCardItem;