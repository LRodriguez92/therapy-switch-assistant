import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Switch Confirmation Page
 * Confirms successful therapist switch and provides next steps
 */
export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const therapist = location.state?.therapist;
  const [showAnimation, setShowAnimation] = useState(false);

  // Redirect if no therapist data
  useEffect(() => {
    if (!therapist) {
      navigate('/therapists/suggestions', { replace: true });
    } else {
      // Trigger animation after mount
      setTimeout(() => setShowAnimation(true), 100);
    }
  }, [therapist, navigate]);

  // Don't render if no therapist (will redirect)
  if (!therapist) {
    return null;
  }

  const handleSendMessage = () => {
    // TODO: Navigate to messaging interface
    // For MVP, just show an alert
    alert('Messaging feature coming soon!');
  };

  const handleScheduleSession = () => {
    // TODO: Navigate to scheduling interface
    // For MVP, just show an alert
    alert('Scheduling feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div
            className={`
              w-20 h-20 rounded-full bg-green-100 flex items-center justify-center
              transition-all duration-500
              ${showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          >
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your therapist has been switched successfully.
          </h1>
          <div className="space-y-2 text-gray-600">
            <p>Your new therapist usually replies within 24 hours.</p>
            <p>You can start messaging them right away.</p>
          </div>
        </div>

        {/* Mini Therapist Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {therapist.image_url ? (
                <img
                  src={therapist.image_url}
                  alt={therapist.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-2xl text-gray-400 ${therapist.image_url ? 'hidden' : ''}`}
              >
                👤
              </div>
            </div>

            {/* Therapist Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {therapist.name}
              </h3>
              
              {/* Specialties */}
              {therapist.specialties && therapist.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {therapist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}

              {/* Modalities */}
              {therapist.modalities && therapist.modalities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {therapist.modalities.map((modality, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"
                    >
                      {modality}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSendMessage}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send first message
          </button>
          
          <button
            onClick={handleScheduleSession}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Schedule a session
          </button>
        </div>

        {/* Optional: Back to Dashboard */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/feedback')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Back to Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
