import { useState } from 'react';

/**
 * Therapist Card Component
 * Displays therapist information in a card format
 * @param {Object} props
 * @param {Object} props.therapist - Therapist data
 * @param {number} props.therapist.id - Therapist ID
 * @param {string} props.therapist.name - Therapist name
 * @param {string[]} props.therapist.specialties - List of specialties
 * @param {string[]} props.therapist.modalities - List of therapy modalities
 * @param {string[]} props.therapist.availability - List of availability options
 * @param {string} [props.therapist.image_url] - Profile image URL
 * @param {number} [props.therapist.rating] - Therapist rating
 * @param {number} [props.therapist.match_score] - Match score (1-5)
 * @param {Function} [props.onViewDetails] - Callback for view details button
 * @param {Function} [props.onSwitch] - Callback for switch button
 * @param {boolean} [props.isSwitching] - Whether switch is in progress
 */
export default function TherapistCard({ 
  therapist, 
  onViewDetails, 
  onSwitch,
  isSwitching = false 
}) {
  const [showFullBio, setShowFullBio] = useState(false);
  
  const {
    id,
    name,
    specialties = [],
    modalities = [],
    availability = [],
    image_url,
    rating,
    match_score
  } = therapist;

  // Calculate match percentage (match_score is 1-5, convert to percentage)
  const matchPercentage = match_score ? (match_score / 5) * 100 : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200">
      {/* Profile Image */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full flex items-center justify-center text-6xl text-gray-400 ${image_url ? 'hidden' : ''}`}
        >
          👤
        </div>
      </div>

      <div className="p-6">
        {/* Name and Match Score */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex-1">
            {name}
          </h3>
          {matchPercentage && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
              {Math.round(matchPercentage)}% match
            </span>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="mb-3 flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modalities */}
        {modalities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {modalities.map((modality, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"
                >
                  {modality}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        {availability.length > 0 && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <span>🕐</span>
            <span>{availability.join(', ')}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(therapist)}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              View Details
            </button>
          )}
          {onSwitch && (
            <button
              onClick={() => onSwitch(therapist)}
              disabled={isSwitching}
              className={`
                flex-1 px-4 py-2 font-medium rounded-lg transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isSwitching
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                }
              `}
            >
              {isSwitching ? 'Switching...' : 'Switch to This Therapist'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

