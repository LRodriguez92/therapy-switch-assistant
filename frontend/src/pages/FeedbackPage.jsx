import { useState } from 'react';
import StarRating from '../components/StarRating';
import LowRatingModal from '../components/LowRatingModal';
import { submitFeedback } from '../services/api';

/**
 * Feedback Page
 * Collects user's session rating and optional comments
 */
export default function FeedbackPage() {
  // TODO: Get userId from auth context or props
  // For MVP, using a hardcoded userId
  const userId = 1;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setError(null);
    setSuccessMessage(null);
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setComment(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await submitFeedback({
        userId,
        rating,
        comment: comment.trim(),
      });

      if (rating <= 3) {
        // Show modal for low ratings
        setShowModal(true);
      } else {
        // Show success message for high ratings
        setSuccessMessage(response.message || 'Thank you for your feedback!');
        // Reset form
        setRating(0);
        setComment('');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeepCurrentTherapist = () => {
    setSuccessMessage('Thank you for your feedback!');
    setRating(0);
    setComment('');
  };

  const characterCount = comment.length;
  const maxCharacters = 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          How was your session?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Rate your experience
            </label>
            <StarRating 
              rating={rating} 
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Comment Textarea */}
          <div>
            <label 
              htmlFor="comment" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tell us about your experience (optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Share your thoughts about the session..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors text-gray-900 placeholder:text-gray-400"
              aria-label="Feedback comment"
            />
            <div className="mt-1 text-right text-sm text-gray-500">
              {characterCount} / {maxCharacters}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                rating === 0 || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      {/* Low Rating Modal */}
      <LowRatingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onKeepCurrent={handleKeepCurrentTherapist}
      />
    </div>
  );
}
