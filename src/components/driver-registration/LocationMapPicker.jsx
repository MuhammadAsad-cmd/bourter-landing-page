"use client";

import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

// Component to control map center and zoom when location changes
const MapController = ({ selectedLocation, onMapReady }) => {
  const map = useMap("location-map");
  const hasCalledReadyRef = useRef(false);

  useEffect(() => {
    if (map && !hasCalledReadyRef.current) {
      hasCalledReadyRef.current = true;
      if (onMapReady) {
        onMapReady();
      }
    }
  }, [map, onMapReady]);

  useEffect(() => {
    if (map && selectedLocation.lat && selectedLocation.lng) {
      const timer = setTimeout(() => {
        try {
          map.setCenter(selectedLocation);
          map.setZoom(15);
        } catch (error) {
          console.error("Error setting map center:", error);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [map, selectedLocation.lat, selectedLocation.lng]);

  return null;
};

const LocationMapPicker = ({ 
  selectedLocation, 
  onLocationSelect, 
  locationSearch, 
  onLocationSearchChange 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const inputRef = useRef(null);
  const autocompleteInstanceRef = useRef(null);

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    const initAutocomplete = () => {
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.places &&
        inputRef.current &&
        !autocompleteInstanceRef.current
      ) {
        autocompleteInstanceRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["geocode"],
          fields: ["geometry", "formatted_address"],
        });

        autocompleteInstanceRef.current.addListener("place_changed", () => {
          const place = autocompleteInstanceRef.current.getPlace();
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            onLocationSelect({ lat, lng });
            onLocationSearchChange(place.formatted_address || "");
          }
        });
      }
    };

    const checkInterval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.places
      ) {
        initAutocomplete();
        clearInterval(checkInterval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
      if (autocompleteInstanceRef.current) {
        window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstanceRef.current);
      }
    };
  }, [onLocationSelect, onLocationSearchChange]);

  // Reverse geocode to get address when location is set but no search text
  useEffect(() => {
    if (
      selectedLocation.lat && 
      selectedLocation.lng && 
      !locationSearch
    ) {
      const performGeocode = () => {
        if (
          typeof window !== "undefined" && 
          window.google && 
          window.google.maps &&
          typeof window.google.maps.Geocoder === "function"
        ) {
          try {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: selectedLocation }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                onLocationSearchChange(results[0].formatted_address);
              }
            });
          } catch (error) {
            console.error("Error initializing Geocoder:", error);
          }
          return true;
        }
        return false;
      };

      // Try immediately
      if (performGeocode()) {
        return;
      }

      // If not ready, wait for it
      const checkInterval = setInterval(() => {
        if (performGeocode()) {
          clearInterval(checkInterval);
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [selectedLocation.lat, selectedLocation.lng, locationSearch, onLocationSearchChange]);

  const handleMapClick = (e) => {
    if (e.detail?.latLng) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      onLocationSelect({ lat, lng });
    }
  };

  const defaultCenter = { lat: 24.8607, lng: 67.0011 };
  const center = selectedLocation.lat && selectedLocation.lng ? selectedLocation : defaultCenter;
  const zoom = selectedLocation.lat && selectedLocation.lng ? 15 : 10;

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={locationSearch}
          onChange={(e) => onLocationSearchChange(e.target.value)}
          placeholder="Search for a location..."
          className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div className="relative bg-gray-100 rounded-lg" style={{ height: "350px", width: "100%", overflow: "hidden", minHeight: "350px" }}>
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            id="location-map"
            center={center}
            zoom={zoom}
            defaultCenter={defaultCenter}
            defaultZoom={10}
            {...(process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID && { mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID })}
            gestureHandling="auto"
            disableDefaultUI={false}
            zoomControl={true}
            mapTypeControl={true}
            scaleControl={true}
            streetViewControl={false}
            rotateControl={false}
            fullscreenControl={true}
            onClick={handleMapClick}
            style={{ height: "100%", width: "100%", display: "block" }}
          >
            {selectedLocation.lat && selectedLocation.lng && (
              <Marker
                position={selectedLocation}
                title="Selected Location"
              />
            )}
            <MapController 
              selectedLocation={selectedLocation}
              onMapReady={() => setMapLoaded(true)}
            />
          </Map>
        </APIProvider>
      </div>
      
      {selectedLocation.lat && selectedLocation.lng && (
        <p className="text-sm text-gray-600">
          Selected: Lat {selectedLocation.lat.toFixed(6)}, Lng {selectedLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default LocationMapPicker;

