import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Low Rating Modal Component
 * Appears when user submits a rating ≤ 3
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Callback to close modal
 * @param {Function} props.onKeepCurrent - Callback when user chooses to keep current therapist
 */
export default function LowRatingModal({ isOpen, onClose, onKeepCurrent }) {
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShowMatches = () => {
    navigate('/therapists/suggestions');
  };

  const handleKeepCurrent = () => {
    onKeepCurrent();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Sorry this session didn't feel like a good fit.
        </h2>
        
        <p className="text-gray-600 mb-6">
          You deserve a therapist who feels right. Want to try a better match?
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleShowMatches}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Yes, show matches
          </button>
          
          <button
            onClick={handleKeepCurrent}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            No, keep current therapist
          </button>
        </div>
      </div>
    </div>
  );
}

