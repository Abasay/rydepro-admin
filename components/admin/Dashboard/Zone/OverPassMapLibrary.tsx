import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
  };
}

interface TransformedLocation {
  id: number;
  name: string;
  position: [number, number];
}

const OverpassMap = () => {
  const [locations, setLocations] = useState<TransformedLocation[]>([]);

  useEffect(() => {
    // Overpass API query to fetch locations (example: cafes in San Francisco)
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
        const transformedLocations: TransformedLocation[] = (data.elements as OverpassElement[])
          .filter((el) => el.type === 'node')
          .map((node) => ({
            id: node.id,
            name: node.tags?.name || 'Unnamed Cafe',
            position: [node.lat, node.lon],
          }));

        setLocations(transformedLocations);
      } catch (error) {
        console.error('Error fetching Overpass data:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer center={[37.7749, -122.4194]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers for locations */}
        {locations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OverpassMap;
