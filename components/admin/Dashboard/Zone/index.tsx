'use client';
import React, { useState, useEffect } from 'react';
import Map, { GeolocateControl, NavigationControl, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';
import LocationIcon from './Location.svg';
import Input from './Input';
import { useFormik } from 'formik';

const fetchOverpassData = async (location: string, polygonFor: string) => {
  const query = `
    [out:json];
    area[name="${location}"]->.searchArea;
    (
      relation["boundary"="administrative"](area.searchArea);
    );
    out geom;
  `;

  const url = 'https://overpass-api.de/api/interpreter';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ data: query }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data); //

    const polygons = processRelations(data.elements, polygonFor);
    // console.log(polygons);
    return polygons;
  } catch (error) {
    console.error('Error:', error);
  }
};

// fetchOverpassData('', '');

const processRelations = (elements: any[], polygonFor: string) => {
  const polygons = [];
  let coordinates = [] as any;

  elements.forEach((element) => {
    console.log(element);
    if (element.type === 'relation' && element.members) {
      const polygon = {
        id: element.id,
        name: element.tags?.name || 'Unknown',
        coordinates: [] as any,
      };

      element.members.forEach((member: any) => {
        if (member.type === 'way' && member.geometry) {
          //   console.log(member.geometry);
          const coords = member.geometry.map((point: any) => [point.lon, point.lat]);
          polygon.coordinates.push(coords as any);
        }
      });
      polygons.push(polygon);

      if (polygon.name.toLowerCase() === polygonFor.toLowerCase()) {
        coordinates = polygon.coordinates.flat();
      }

      // coordinates = polygon.name.toLoweCase() === polygonFor.toLoweCase() && polygon.coordinates.flat()
    }
  });

  return coordinates;
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGV2YXB4LTIwMjUiLCJhIjoiY202dzVxcXI1MGVwZDJscHYxMzZiZTc2NyJ9.E5XMWj4NoimXEB2S3r-Eng';

interface Suggestion {
  id: string;
  place_name: string;
  center: number[];
}

interface GeojsonData {
  features: any[];
  type: string;
}

const Zone = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<Suggestion | null>(null);
  const [zoneName, setZoneName] = useState('');
  const [zoneType, setZoneType] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      zone: '',
      country: '',
      state: '',
      city: '',
      timeZone: '',
      county: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        setSuggestions(data.features);
        console.log(data);
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      const [longitude, latitude] = suggestions[0]?.center;
      setViewport({ ...viewport, latitude, longitude, zoom: 10 });
      setSelectedLocation(suggestions[0]);

      await fetchIsochroneData(latitude, longitude, suggestions[0]);
    }
  };

  const fetchIsochroneData = async (
    latitude: number,
    longitude: number,
    dataCoord: {
      id: string;
      place_name: string;
      center: number[];
    }
  ) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/isochrone/v1/mapbox/driving/${longitude},${latitude}?contours_minutes=5&polygons=true&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      console.log(data);
      setGeojsonData({
        features: [
          {
            properties: {
              'fill-opacity': 0.5, // Medium opacity for better visibility
              fillColor: '#3399FF', // Bright sky blue
              opacity: 0.5,
              fill: '#3399FF', // Fill color
              fillOpacity: 0.5,
              color: '#003366', // Dark navy blue outline for contrast
              contour: 5,
              metric: 'time',
            },
            geometry: {
              coordinates: [dataCoord],
              type: 'Polygon',
            },
            type: 'Feature',
          },
        ],
        type: 'FeatureCollection',
      });
    } catch (error) {
      console.error('Error fetching isochrone data:', error);
    }
  };

  // useEffect();

  const handleSuggestionClick = async (longitude: number, latitude: number) => {
    setViewport({ ...viewport, latitude, longitude, zoom: 12 });
    setSuggestions([]);
    const selected = suggestions.find(
      (suggestion) => suggestion.center[0] === longitude && suggestion.center[1] === latitude
    );

    console.log(selected);
    const locations = selected?.place_name.split(',');
    if (!locations) return;
    await fetchOverpassData(locations[1].trim(), locations[0].trim()).then(async (data) => {
      // setCoordinates(data);
      setSelectedLocation(selected as any);
      console.log(data);
      await fetchIsochroneData(latitude, longitude, data);
    });
    // console.log(testcoord);
  };

  const handleZoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName) return alert('Please enter a zone name.');
    if (!zoneType) return alert('Please select a zone type.');
    const data = {
      name: zoneName,
      geometry: {
        type: 'Point',
        coordinates: [selectedLocation?.center[0], selectedLocation?.center[1]],
      },
      location: selectedLocation?.place_name,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/admins/zones`,
        { ...data, zoneType: 'Local', zoneName: selectedLocation?.place_name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Zone saved successfully!');
        router.push('/');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.error('Error saving zone:', error);
    }
  };

  return (
    <section className=" w-full relative">
      <div className=" flex gap-6 ">
        <div className=" relative w-full">
          <form
            onSubmit={handleSearch}
            className={`absolute px-10 top-0 w-full z-10 bg-[#FFFFFF] border border-[#DADADA] rounded-2xl pb-10 pt-4 ${
              suggestions.length > 0 ? 'h-[400px]' : 'h-32'
            }`}
          >
            <label htmlFor="searchTerm" className=" flex flex-col gap-4 relative ">
              <span className=" text-lg font-medium">Search Location</span>
              <div className=" border border-[#DADADA] flex rounded-lg items-center py-0.5 px-3 pr-1 ">
                <Image src={searchIcon} alt="" width={12} height={12} className="w-[12px] h-[12px] " />
                <input
                  className="w-full h-9 px-3 rounded-lg focus:outline-none outline-none focus-within:outline-none"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter a location name or zip code"
                />
                <button className=" bg-[#0E0E0E] rounded-lg h-8 w-20 p-2 text-[#FAF6F6] text-xs  font-medium">
                  Search
                </button>
              </div>
              {suggestions.length > 0 && (
                <div className="absolute left-0 top-[85px] border-[#DADADA] border  rounded-lg h-[283px] bg-[#FCFCFC] w-full  text-black rounded-b-lg shadow-md z-20">
                  {suggestions.map((suggestion, idx) => (
                    <div
                      key={suggestion.id}
                      className={`px-3 py-2 ${
                        suggestions.length - 1 === idx ? ' ' : ' border-b'
                      } h-14 border-gray-200 cursor-pointer hover:bg-gray-100 flex items-center gap-2`}
                      onClick={() => handleSuggestionClick(suggestion.center[0], suggestion.center[1])}
                    >
                      <span>
                        <Image src={LocationIcon} alt="" width={20} height={20} className="w-[20px] h-[20px] " />
                      </span>
                      {suggestion.place_name}
                    </div>
                  ))}
                </div>
              )}
            </label>
          </form>
        </div>
        {selectedLocation && (
          <div className=" flex flex-col items-center p-6 gap-4 bg-[#FFFFFF] border border-[#DADADA] rounded-2xl">
            <div className=" flex flex-wrap gap-6">
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
              />

              <Input
                labelText="State:"
                placeholder="Enter State Name"
                name="state"
                value={formik.values.state}
                onChange={(e) => formik.setValues({ ...formik.values, state: e.target.value })}
                important
              />

              <Input
                labelText="County:"
                placeholder="Enter County Name"
                name="county"
                value={formik.values.county}
                onChange={(e) => formik.setValues({ ...formik.values, county: e.target.value })}
                important
              />

              <Input
                labelText="City:"
                placeholder="Enter City Name"
                name="city"
                value={formik.values.city}
                onChange={(e) => formik.setValues({ ...formik.values, city: e.target.value })}
                important
              />

              <Input
                labelText="Time Zone"
                placeholder="Enter Time Zone"
                name="timeZone"
                value={formik.values.timeZone}
                onChange={(e) => formik.setValues({ ...formik.values, timeZone: e.target.value })}
                important
              />
            </div>

            <div className=" flex items-center gap-4">
              <button className=" bg-[#0E0E0E] rounded-lg h-8 w-20 p-2 text-[#FAF6F6] text-xs  font-medium">
                Save
              </button>
              <button className=" bg-[#F5F5F5] rounded-lg h-8 w-20 p-2 text-[#0E0E0E] text-xs  font-medium">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ width: '100vw', height: '100vh' }}>
        <Map
          {...viewport}
          // width="100%"
          // height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={(evt: { viewState: any }) => setViewport(evt.viewState)}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <GeolocateControl />
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <NavigationControl />
          </div>
          {geojsonData && (
            <Source id="address-shape" type="geojson" data={geojsonData}>
              <Layer
                id="address-shape-layer"
                type="fill"
                paint={{
                  'fill-color': '#D52323',
                  'fill-opacity': 0.6,
                  'fill-outline-color': '#008',
                }}
              />
            </Source>
          )}
        </Map>
      </div>
    </section>
  );
};

export default Zone;
