import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as turf from '@turf/turf'; // Optional: For GeoJSON simplification
import Input from './Input';
import { useFormik } from 'formik';
import Image from 'next/image';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';
import LocationIcon from './Location.svg';
import { POST_REQUEST } from '@/utils/lib/server-requests';
import { URLS } from '@/utils/lib/urls';
import Cookies from 'js-cookie';
import { useDB } from '@/contexts/DBContext';

// Import Leaflet Draw directly
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { useTimezoneSelect, allTimezones } from 'react-timezone-select';
// import { Select } from '@/components/UI/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../LucideUI/select';
import Select from 'react-select';
import Button from '../Vehicle/Button';

const labelStyle = 'original';
const timezones = {
  ...allTimezones,
  'Europe/Berlin': 'Frankfurt',
};

// Extend Leaflet types to include Draw
declare module 'leaflet' {
  namespace Control {
    class Draw {
      constructor(options?: any);
    }
  }

  namespace Draw {
    namespace Event {
      const CREATED: string;
      const EDITED: string;
      const DELETED: string;
    }
  }
}

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  geojson?: any;
  osm_type?: string;
  osm_id?: number;
  boundingbox?: string[];
}

const fixLeafletIcons = () => {
  // Only run on client-side
  if (typeof window !== 'undefined') {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });
  }
};

// Component to handle map centering and zooming
const MapController = ({ position, bounds }: { position: [number, number]; bounds?: L.LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      try {
        map.fitBounds(bounds);
      } catch (error) {
        console.error('Error fitting to bounds:', error);
        map.setView(position, 10);
      }
    } else {
      map.setView(position, 13);
    }
  }, [position, bounds, map]);

  return null;
};

// Component to initialize drawing controls
const DrawingTools = ({ onDrawCreate, onDrawEdit, onDrawDelete, drawMode }: any) => {
  const map = useMap();
  const drawControlRef = useRef<any>(null);
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    drawnItemsRef.current.addTo(map);

    // Initialize draw control
    drawControlRef.current = new L.Control.Draw({
      edit: {
        featureGroup: drawnItemsRef.current,
        poly: {
          allowIntersection: false,
        },
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
        rectangle: true,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
      },
    });

    // Event handlers
    map.on(L.Draw.Event.CREATED, function (e: any) {
      const layer = e.layer;
      drawnItemsRef.current.addLayer(layer);

      // Convert to GeoJSON and pass it up
      const geoJSON = layer.toGeoJSON();
      onDrawCreate(geoJSON);
    });

    map.on(L.Draw.Event.EDITED, function (e: any) {
      const layers = e.layers;
      // Just get the first layer as we only allow one shape at a time
      let editedGeoJSON = null;
      layers.eachLayer((layer: any) => {
        editedGeoJSON = layer.toGeoJSON();
      });

      if (editedGeoJSON) {
        onDrawEdit(editedGeoJSON);
      }
    });

    map.on(L.Draw.Event.DELETED, function () {
      onDrawDelete();
    });

    return () => {
      // Cleanup
      map.off(L.Draw.Event.CREATED);
      map.off(L.Draw.Event.EDITED);
      map.off(L.Draw.Event.DELETED);
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
      }
      if (map.hasLayer(drawnItemsRef.current)) {
        map.removeLayer(drawnItemsRef.current);
      }
    };
  }, [map, onDrawCreate, onDrawEdit, onDrawDelete]);

  // Add or remove drawing controls based on drawMode state
  useEffect(() => {
    if (drawMode) {
      if (drawControlRef.current) {
        map.addControl(drawControlRef.current);
      }
    } else {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
      }
      // Clear drawn items when exiting draw mode
      drawnItemsRef.current.clearLayers();
    }
  }, [drawMode, map]);

  // Expose a method to clear drawn items
  useEffect(() => {
    (window as any).clearDrawnItems = () => {
      drawnItemsRef.current.clearLayers();
      onDrawDelete();
    };

    return () => {
      delete (window as any).clearDrawnItems;
    };
  }, [onDrawDelete]);

  return null;
};

// Helper function to simplify complex geometries
const simplifyGeoJSON = (geoJSON: any, tolerance = 0.0001): any => {
  try {
    const simplified = { ...geoJSON };

    // Process each feature
    if (simplified.type === 'FeatureCollection' && simplified.features) {
      simplified.features = simplified.features.map((feature: any) => {
        if (!feature.geometry) return feature;

        // Simple point reduction for Polygons and LineStrings
        if (feature.geometry.type === 'Polygon') {
          feature.geometry.coordinates = feature.geometry.coordinates.map((ring: any) => {
            // Only keep every nth point based on array size
            if (ring.length > 200) {
              const factor = Math.ceil(ring.length / 200);
              return ring.filter((_: any, idx: number) => idx % factor === 0);
            }
            return ring;
          });
        } else if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates = feature.geometry.coordinates.map((polygon: any) => {
            return polygon.map((ring: any) => {
              if (ring.length > 200) {
                const factor = Math.ceil(ring.length / 200);
                return ring.filter((_: any, idx: number) => idx % factor === 0);
              }
              return ring;
            });
          });
        }

        return feature;
      });
    }

    return simplified;
  } catch (e) {
    console.error('Error simplifying GeoJSON:', e);
    return geoJSON; // Return original if simplification fails
  }
};

const OverpassMap = () => {
  const { setSuccessText, setErrorText } = useDB();
  const { getZones } = useDashboardContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    center: [number, number];
    geoJSON: any;
    originalGeoJSON: any;
    name: string;
    bounds?: L.LatLngBoundsExpression;
  } | null>(null);
  const [initialCenter] = useState<[number, number]>([37.7749, -122.4194]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [geojsonLoading, setGeojsonLoading] = useState<boolean>(false);
  const [geojsonError, setGeojsonError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const geoJSONRef = useRef<L.GeoJSON | null>(null);
  const [zoneType, setZoneType] = useState<string>('');

  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones });

  // Drawing states
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [manuallyDrawnGeoJSON, setManuallyDrawnGeoJSON] = useState<any>(null);
  const [drawingComplete, setDrawingComplete] = useState<boolean>(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    fixLeafletIcons();
  }, []);

  const formik = useFormik({
    initialValues: {
      zone: '',
      country: '',
      state: '',
      city: '',
      timeZone: '',
      county: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      // Use either manually drawn GeoJSON or selected location GeoJSON
      const geometryToSubmit = drawMode ? manuallyDrawnGeoJSON.geometry : selectedLocation?.geoJSON;

      if (!geometryToSubmit) {
        setErrorText('Please select a location or draw an area first.');
        setTimeout(() => {
          setErrorText('');
        }, 3000);
        return;
      }

      const payload = {
        zoneName: values.zone,
        zoneType: zoneType || 'custom', // Use custom for manually drawn zones
        state: values.state,
        county: values.county,
        country: values.country,
        city: values.city,
        timeZone: values.timeZone,
        geometry: geometryToSubmit,
      };

      const url = URLS.BASE_URL_ADMIN + URLS.createZone;
      setSubmitting(true);

      await POST_REQUEST(url, payload, Cookies.get('token'))
        .then((result) => {
          if (result.success) {
            getZones();
            setSuccessText('Zone created successfully!');

            setTimeout(() => {
              setSuccessText('');
            }, 3000);

            formik.resetForm();
            setSelectedLocation(null);
          } else {
            setErrorText(result.message);
            setTimeout(() => {
              setErrorText('');
            }, 3000);
          }
        })
        .catch((err) => {
          console.error('Error creating zone:', err);
          setErrorText('An error occurred while creating the zone.');
          setTimeout(() => {
            setErrorText('');
          }, 3000);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  // Fetch location suggestions with GeoJSON
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}&limit=5&polygon_geojson=1`
        );
        const data = await response.json();
        console.log('Nominatim response:', data);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce suggestions fetch
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Create bounds from boundingbox
  const createBoundsFromBoundingBox = (boundingbox?: string[]): L.LatLngBoundsExpression | undefined => {
    if (!boundingbox || boundingbox.length < 4) return undefined;

    return [
      [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
      [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
    ];
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = async (suggestion: LocationSuggestion) => {
    console.log('Selected location data:', suggestion);
    setGeojsonLoading(true);
    setGeojsonError(null);

    // Clear any drawn items when selecting a location
    if (typeof window !== 'undefined' && (window as any).clearDrawnItems) {
      (window as any).clearDrawnItems();
    }

    setManuallyDrawnGeoJSON(null);
    setDrawingComplete(false);
    setDrawMode(false);

    try {
      const center: [number, number] = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
      const bounds = createBoundsFromBoundingBox(suggestion.boundingbox);

      // Check if GeoJSON is large
      let isLargeGeoJSON = false;

      if (suggestion.geojson) {
        const geojsonSize = JSON.stringify(suggestion.geojson).length;
        console.log('GeoJSON size:', geojsonSize, 'bytes');

        console.log('GeoJSON type:', suggestion.geojson);

        // If it's a FeatureCollection, check coordinate count
        if (suggestion.geojson.type === 'FeatureCollection') {
          let totalCoords = 0;
          suggestion.geojson.features.forEach((feature: any) => {
            if (feature.geometry.type === 'Polygon') {
              feature.geometry.coordinates.forEach((ring: any) => {
                totalCoords += ring.length;
              });
            } else if (feature.geometry.type === 'MultiPolygon') {
              feature.geometry.coordinates.forEach((polygon: any) => {
                polygon.forEach((ring: any) => {
                  totalCoords += ring.length;
                });
              });
            }
          });
          console.log('Total coordinates:', totalCoords);
          isLargeGeoJSON = totalCoords > 500;
        }
      }

      // Simplify large GeoJSON
      const processedGeoJSON =
        isLargeGeoJSON && suggestion.geojson ? simplifyGeoJSON(suggestion.geojson) : suggestion.geojson;

      setSelectedLocation({
        center,
        geoJSON: processedGeoJSON,
        originalGeoJSON: suggestion.geojson,
        name: suggestion.display_name,
        bounds,
      });

      // const country = suggestion.display_name.split(',').slice(-1)[0].trim();
      // const state = suggestion.display_name.split(',').slice(-2)[0].trim();
      // const city = suggestion.display_name.split(',').slice(-3)[0].trim();
      // const county = suggestion.display_name.split(',').slice(-4)[0].trim();
      // setZoneType(suggestion?.osm_type || '');

      const country = (suggestion as any).address?.country || '';
      const state = (suggestion as any).address?.state || '';
      const city =
        (suggestion as any).address?.city ||
        (suggestion as any).address?.town ||
        (suggestion as any).address?.village ||
        '';
      const county = (suggestion as any).address?.county || '';
      setZoneType((suggestion as any)?.osm_type || '');

      formik.setValues({
        ...formik.values,
        country: country,
        state: state,
        city: city,
        county: county,
      });

      setSearchQuery(suggestion.display_name);
      setSuggestions([]);
    } catch (error) {
      console.error('Error processing GeoJSON:', error);
      setGeojsonError('Error processing location boundaries');
    } finally {
      setGeojsonLoading(false);
    }

    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedLocation(null);
    setSearchQuery('');
    setGeojsonError(null);

    // Clear drawing as well
    if (typeof window !== 'undefined' && (window as any).clearDrawnItems) {
      (window as any).clearDrawnItems();
    }

    setManuallyDrawnGeoJSON(null);
    setDrawingComplete(false);
    setDrawMode(false);
  };

  // Enable/disable draw mode
  const toggleDrawMode = () => {
    const newMode = !drawMode;
    setDrawMode(newMode);

    // Clear previous selection when entering draw mode
    if (newMode) {
      setSelectedLocation(null);
      setSearchQuery('');
    } else {
      // Clear drawings when exiting draw mode
      if (typeof window !== 'undefined' && (window as any).clearDrawnItems) {
        (window as any).clearDrawnItems();
      }
      setManuallyDrawnGeoJSON(null);
      setDrawingComplete(false);
    }
  };

  // Style for area outlines
  const areaStyle = {
    fillColor: '#F89090',
    color: '#F79090',
    weight: 2,
    fillOpacity: 0.2,
  };

  // Handle draw events
  const handleDrawCreated = (geoJSON: any) => {
    console.log('Drawing created:', geoJSON);
    setManuallyDrawnGeoJSON(geoJSON);
    setDrawingComplete(true);

    // Set default form values for custom area
    formik.setValues({
      ...formik.values,
      zone: 'Custom Zone',
      country: '',
      state: '',
      city: '',
      county: '',
      timeZone: '',
    });

    setZoneType('custom');
  };

  const handleDrawEdited = (geoJSON: any) => {
    console.log('Drawing edited:', geoJSON);
    setManuallyDrawnGeoJSON(geoJSON);
  };

  const handleDrawDeleted = () => {
    console.log('Drawing deleted');
    setManuallyDrawnGeoJSON(null);
    setDrawingComplete(false);
  };

  // Enhanced GeoJSON rendering with error handling
  const renderGeoJSON = () => {
    if (!selectedLocation?.geoJSON) return null;

    return (
      <GeoJSON
        key={`geojson-${Date.now()}`} // Force re-render on change
        data={selectedLocation.geoJSON}
        style={areaStyle}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(selectedLocation.name);
        }}
        ref={geoJSONRef}
      />
    );
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Input with Suggestions */}

      <div className="flex relative gap-6">
        <div className="relative w-full">
          {drawMode && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm">
              <p className="font-medium">Drawing Mode Instructions:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Click the polygon or rectangle tool in the top right of the map</li>
                <li>Click points on the map to draw your zone</li>
                <li>Double-click the last point or click the first point to complete the shape</li>
                <li>Use the edit tool to modify your shape if needed</li>
              </ul>
              <button
                type="button"
                onClick={toggleDrawMode}
                className={`px-4 py-2 mt-2 rounded-lg text-xs font-medium ${
                  drawMode ? 'bg-green-500 text-white' : 'bg-[#F5F5F5] text-[#0E0E0E]'
                }`}
              >
                {drawMode ? 'Drawing Mode: ON' : 'Drawing Mode: OFF'}
              </button>
            </div>
          )}
          {!drawMode && (
            <form
              onSubmit={formik.handleSubmit}
              className={`absolute px-10 top-0 w-full z-50 bg-[#FFFFFF] border border-[#DADADA] rounded-2xl pb-10 pt-4 ${
                suggestions.length > 0 ? 'h-[400px]' : drawMode ? 'h-48' : 'h-32'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="searchTerm" className="text-lg font-medium">
                  Search Location
                </label>

                {/* Drawing Mode Toggle Button */}
                <button
                  type="button"
                  onClick={toggleDrawMode}
                  className={`px-4 py-2 rounded-lg text-xs font-medium ${
                    drawMode ? 'bg-green-500 text-white' : 'bg-[#F5F5F5] text-[#0E0E0E]'
                  }`}
                >
                  {drawMode ? 'Drawing Mode: ON' : 'Drawing Mode: OFF'}
                </button>
              </div>

              <div className="flex flex-col gap-4 relative">
                {isLoading && (
                  <div className="absolute right-32 top-2">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                )}

                <div className="border border-[#DADADA] flex rounded-lg items-center py-0.5 px-3 pr-1">
                  <Image src={searchIcon} alt="" width={12} height={12} className="w-[12px] h-[12px]" />
                  <input
                    className="w-full h-9 px-3 rounded-lg focus:outline-none outline-none focus-within:outline-none"
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a location name or zip code"
                    disabled={drawMode}
                  />
                  <button
                    type="button"
                    className="bg-[#0E0E0E] rounded-lg h-8 w-20 p-2 text-[#FAF6F6] text-xs font-medium"
                    disabled={drawMode}
                  >
                    Search
                  </button>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="bg-gray-200 p-2 rounded-r rounded-lg h-8 ml-2 grid place-content-center border-r border-b hover:bg-gray-300"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {suggestions.length > 0 && !drawMode && (
                  <div className="absolute left-0 top-[85px] border-[#DADADA] border rounded-lg h-min bg-[#FCFCFC] w-full text-black rounded-b-lg shadow-md z-20">
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-2 ${
                          suggestions.length - 1 === idx ? ' ' : ' border-b'
                        } h-14 border-gray-200 cursor-pointer hover:bg-gray-100 flex items-center gap-2`}
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        <span>
                          <Image src={LocationIcon} alt="" width={20} height={20} className="w-[20px] h-[20px]" />
                        </span>
                        {suggestion.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Zone details form */}
        {(selectedLocation || drawingComplete) && (
          <div className="flex flex-col items-center p-6 gap-4 bg-[#FFFFFF] border border-[#DADADA] rounded-2xl">
            <div className="flex flex-wrap gap-6">
              <Input
                labelText="Zone:"
                placeholder="Enter Zone Name"
                name="zone"
                value={formik.values.zone}
                onChange={(e) => formik.setValues({ ...formik.values, zone: e.target.value })}
                important
              />

              <Input
                labelText="Country:"
                placeholder="Enter Country Name"
                name="country"
                value={formik.values.country}
                onChange={(e) => formik.setValues({ ...formik.values, country: e.target.value })}
                important
                disabled={!drawMode && !drawingComplete}
              />

              <Input
                labelText="State:"
                placeholder="Enter State Name"
                name="state"
                value={formik.values.state}
                onChange={(e) => formik.setValues({ ...formik.values, state: e.target.value })}
                important
                disabled={!drawMode && !drawingComplete}
              />

              <Input
                labelText="County:"
                placeholder="Enter County Name"
                name="county"
                value={formik.values.county}
                onChange={(e) => formik.setValues({ ...formik.values, county: e.target.value })}
                important
                disabled={!drawMode && !drawingComplete}
              />

              <Input
                labelText="City:"
                placeholder="Enter City Name"
                name="city"
                value={formik.values.city}
                onChange={(e) => formik.setValues({ ...formik.values, city: e.target.value })}
                important
                disabled={!drawMode && !drawingComplete}
              />

              <div className=" flex flex-col gap-3 w-[181px] items-start ">
                <label className="text-[#0E0E0E] font-bold text-sm">
                  TimeZone {<span className="text-[#D21B34]">*</span>}
                </label>

                {/* <Select onValueChange={(value) => formik.setFieldValue('timeZone', value)}>
                  <SelectTrigger className=" border-b border-[#DADADA]">
                    <SelectValue placeholder="Select Time Zone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {options.map((option) => (
                      <SelectItem key={option.altName} value={option.label}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                <Select
                  options={options}
                  value={options.find((option) => option.value === formik.values.timeZone)}
                  onChange={(option) => {
                    formik.setFieldValue('timeZone', option?.label || '');
                  }}
                  className="w-full min-w-max z-50"
                  placeholder="Select TimeZone"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                className="bg-[#0E0E0E] rounded-lg h-8 w-20 p-2 text-[#FAF6F6] text-xs font-medium"
                onClick={() => formik.handleSubmit()}
                text={formik.isSubmitting ? 'Saving Zone...' : 'Save'}
              />

              <button
                type="button"
                className="bg-[#F5F5F5] rounded-lg h-8 w-20 p-2 text-[#0E0E0E] text-xs font-medium"
                onClick={() => {
                  handleClearSelection();
                  formik.resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 
      {selectedLocation && (
        <div className="absolute top-72 right-4 z-[1000] bg-white p-2 rounded shadow-md max-w-xs">
          <h3 className="font-bold">Selected Location</h3>
          <p className="truncate">{selectedLocation.name}</p>
          {geojsonLoading && <p className="text-sm text-blue-500">Loading boundaries...</p>}
          {geojsonError && <p className="text-sm text-red-500">{geojsonError}</p>}
        </div>
      )} */}

      {drawingComplete && !selectedLocation && (
        <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md max-w-xs">
          <h3 className="font-bold">Custom Area</h3>
          <p className="text-sm text-green-500">Drawing complete! You can save this area as a zone.</p>
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-30"
        preferCanvas={true}
        ref={mapRef}
      >
        {/* Update map view when location is selected */}
        {selectedLocation && <MapController position={selectedLocation.center} bounds={selectedLocation.bounds} />}

        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Area Outlines with error handling */}
        {!geojsonLoading && !geojsonError && renderGeoJSON()}

        {/* Drawing Tools */}
        <DrawingTools
          onDrawCreate={handleDrawCreated}
          onDrawEdit={handleDrawEdited}
          onDrawDelete={handleDrawDeleted}
          drawMode={drawMode}
          style={areaStyle}
        />
      </MapContainer>
    </div>
  );
};

export default OverpassMap;
