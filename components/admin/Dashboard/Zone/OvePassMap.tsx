import React, { useState, useEffect } from 'react';

const OverpassMap = () => {
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    // Overpass API query to fetch locations (cafes in San Francisco)
    const overpassQuery = `
            [out:json];
            (
              node["amenity"="cafe"](37.7,-122.5,37.8,-122.4);
            );
            out body;
            >;
            out skel qt;
        `;

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();

        // Transform Overpass data into location markers
        const transformedLocations = data.elements
          .filter((el: any) => el.type === 'node')
          .map((node: any) => ({
            id: node.id,
            name: node.tags?.name || 'Unnamed Cafe',
            lat: node.lat,
            lon: node.lon,
          }));

        setLocations(transformedLocations);
      } catch (error) {
        console.error('Error fetching Overpass data:', error);
      }
    };

    fetchLocations();
  }, []);

  // Convert latitude/longitude to SVG coordinates
  const convertToSVGCoords = (lat: any, lon: any) => {
    const svgWidth = 400;
    const svgHeight = 300;

    // San Francisco bounding box
    const minLat = 37.7,
      maxLat = 37.8;
    const minLon = -122.5,
      maxLon = -122.4;

    const x = ((lon - minLon) / (maxLon - minLon)) * svgWidth;
    const y = svgHeight - ((lat - minLat) / (maxLat - minLat)) * svgHeight;

    return { x, y };
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 300" className="w-full h-auto border border-gray-300">
        {/* Simple map background */}
        <rect width="400" height="300" fill="#f0f0f0" />

        {/* Locations as markers */}
        {locations.map((location: any) => {
          const { x, y } = convertToSVGCoords(location.lat, location.lon);
          return (
            <g key={location.id}>
              <circle cx={x} cy={y} r="5" fill="red" className="hover:fill-blue-500">
                <title>{location.name}</title>
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 text-center text-sm text-gray-600">Cafes in San Francisco (Overpass API)</div>
    </div>
  );
};

export default OverpassMap;
