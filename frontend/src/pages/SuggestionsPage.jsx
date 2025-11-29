import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TherapistCard from '../components/TherapistCard';
import { getMatches, switchTherapist } from '../services/api';

/**
 * Therapist Suggestions Page
 * Displays top 3 matched therapists with details and switch options
 */
export default function SuggestionsPage() {
  // TODO: Get userId from auth context or props
  // For MVP, using a hardcoded userId
  const userId = 1;

  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [switchingTherapistId, setSwitchingTherapistId] = useState(null);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getMatches(userId);
      setTherapists(response.therapists || []);
    } catch (err) {
      setError(err.message || 'Failed to load therapist suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (therapist) => {
    // For MVP, just log. Can be expanded to show a detail modal or navigate to detail page
    console.log('View details for:', therapist);
    // TODO: Implement detail view/modal
  };

  const handleSwitch = async (therapist) => {
    setSwitchingTherapistId(therapist.id);
    
    try {
      const response = await switchTherapist({
        userId,
        therapistId: therapist.id,
      });
      
      // Navigate to confirmation page with therapist data
      // Using state to pass therapist data, or could use URL params
      navigate('/switch/confirmation', {
        state: { therapist: response.therapist || therapist }
      });
    } catch (err) {
      alert(err.message || 'Failed to switch therapist. Please try again.');
      setSwitchingTherapistId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading therapist suggestions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Suggestions</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTherapists}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (therapists.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Matches Found</h2>
            <p className="text-gray-600">
              We couldn't find any therapist matches at this time. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Therapist Suggestions
          </h1>
          <p className="text-gray-600">
            Here are some therapists that might be a better match for you
          </p>
        </div>

        {/* Therapist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              onViewDetails={handleViewDetails}
              onSwitch={handleSwitch}
              isSwitching={switchingTherapistId === therapist.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
