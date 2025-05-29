import { useState, useEffect, useRef } from 'react';

const GoogleMapsAutocomplete = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Replace with your Google Maps API key
  const API_KEY = 'AIzaSyComsDDl4oIXcxZc5wmw-6QSDyuiQrxLdA';

  // Debounced search function
  const searchPlaces = async (query) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=${API_KEY}&types=geocode`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();

      if (data.status === 'OK') {
        setSuggestions(data.predictions || []);
        setShowSuggestions(true);
      } else if (data.status === 'ZERO_RESULTS') {
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        throw new Error(data.error_message || 'Failed to fetch suggestions');
      }
    } catch (err) {
      setError('Unable to fetch location suggestions. Please check your API key and try again.');
      setSuggestions([]);
      setShowSuggestions(false);
      console.error('Autocomplete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Clear previous debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounce timer
    debounceRef.current = setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion.description);
    setShowSuggestions(false);

    // Get place details
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion.place_id}&key=${API_KEY}&fields=name,geometry,formatted_address,types`
      );

      const data = await response.json();

      if (data.status === 'OK') {
        setSelectedPlace(data.result);
      }
    } catch (err) {
      console.error('Error fetching place details:', err);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 w-full max-w-lg shadow-2xl border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Location Search</h1>

        <div className="relative mb-5" ref={inputRef}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Search for a location..."
              className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
            />

            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-xl shadow-xl z-50 max-h-80 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0 flex items-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{suggestion.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-5 rounded">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Selected Place Details */}
        {selectedPlace && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-green-800 mb-2">Selected Location:</h3>
            <p className="text-green-700 mb-2">{selectedPlace.formatted_address}</p>
            {selectedPlace.geometry && (
              <p className="text-sm text-green-600">
                Coordinates: {selectedPlace.geometry.location.lat.toFixed(6)},{' '}
                {selectedPlace.geometry.location.lng.toFixed(6)}
              </p>
            )}
          </div>
        )}

        {/* API Key Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Replace YOUR_GOOGLE_MAPS_API_KEY with your actual Google Maps API key to enable
            functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsAutocomplete;
