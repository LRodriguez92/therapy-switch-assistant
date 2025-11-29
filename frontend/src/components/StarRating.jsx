import { useState } from 'react';

/**
 * Interactive Star Rating Component
 * @param {Object} props
 * @param {number} props.rating - Current rating (0-5)
 * @param {Function} props.onRatingChange - Callback when rating changes
 * @param {boolean} [props.readonly] - If true, rating cannot be changed
 */
export default function StarRating({ rating = 0, onRatingChange, readonly = false }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleStarHover = (value) => {
    if (!readonly) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div 
      className="flex items-center justify-center gap-1"
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= displayRating;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleStarClick(value)}
            onMouseEnter={() => handleStarHover(value)}
            disabled={readonly}
            className={`
              text-4xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
            `}
            aria-label={`Rate ${value} out of 5 stars`}
            aria-pressed={value === rating}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

