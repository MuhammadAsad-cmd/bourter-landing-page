"use client";

import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

// Component to get map reference and notify when ready
const MapController = ({ onMapReady, mapRef }) => {
  const map = useMap("location-map");
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (map && !hasCalledRef.current) {
      hasCalledRef.current = true;
      if (mapRef) {
        mapRef.current = map;
      }
      if (onMapReady) {
        onMapReady();
      }
    }
  }, [map, onMapReady, mapRef]);

  return null;
};

const LocationMapPicker = ({ 
  selectedLocation, 
  onLocationSelect, 
  locationSearch, 
  onLocationSearchChange 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const lastSelectedLocationRef = useRef(null);
  const inputRef = useRef(null);
  const autocompleteInstanceRef = useRef(null);

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    let visibilityCheckInterval = null;
    let checkInterval = null;
    let timeout = null;
    const focusHandler = () => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.style.zIndex = '9999';
        pacContainer.style.position = 'absolute';
        pacContainer.style.display = 'block';
      }
    };
    const inputHandler = focusHandler;

    const initAutocomplete = () => {
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.places &&
        window.google.maps.places.Autocomplete &&
        inputRef.current
      ) {
        // Clean up existing autocomplete if any
        if (autocompleteInstanceRef.current) {
          window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstanceRef.current);
          autocompleteInstanceRef.current = null;
        }

        try {
          autocompleteInstanceRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            fields: ["geometry", "formatted_address", "name"],
          });

          // Monitor and fix dropdown visibility
          visibilityCheckInterval = setInterval(() => {
            const pacContainer = document.querySelector('.pac-container');
            if (pacContainer) {
              pacContainer.style.zIndex = '9999';
              if (pacContainer.style.display === 'none') {
                pacContainer.style.display = 'block';
              }
            }
          }, 100);

          autocompleteInstanceRef.current.addListener("place_changed", () => {
            const place = autocompleteInstanceRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              const address = place.formatted_address || place.name || "";
              const newLocation = { lat, lng };
              
              // Update location
              onLocationSelect(newLocation);
              onLocationSearchChange(address);
              
              // Update input value
              if (inputRef.current) {
                inputRef.current.value = address;
              }
              
              // Close the autocomplete dropdown
              if (autocompleteInstanceRef.current) {
                autocompleteInstanceRef.current.set('place', null);
              }
              
              // Hide the dropdown container
              const pacContainer = document.querySelector('.pac-container');
              if (pacContainer) {
                pacContainer.style.display = 'none';
              }
              
              // Blur the input to close dropdown
              if (inputRef.current) {
                inputRef.current.blur();
              }
              
              // Update map center and zoom when location is selected from search
              if (mapRef.current) {
                try {
                  mapRef.current.setCenter(newLocation);
                  mapRef.current.setZoom(15);
                } catch (error) {
                  console.error("Error updating map:", error);
                }
              }
              
              if (visibilityCheckInterval) {
                clearInterval(visibilityCheckInterval);
                visibilityCheckInterval = null;
              }
            }
          });

          // Listen for input focus to ensure dropdown is ready
          if (inputRef.current) {
            inputRef.current.addEventListener('focus', focusHandler);
            inputRef.current.addEventListener('input', inputHandler);
          }

          return true;
        } catch (error) {
          console.error("Error initializing autocomplete:", error);
          return false;
        }
      }
      return false;
    };

    // Wait for input to be ready and Google Maps to load
    const initialize = () => {
      if (inputRef.current) {
        if (initAutocomplete()) {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
        }
      }
    };

    // Try immediately
    initialize();

    // If not ready, check periodically
    checkInterval = setInterval(initialize, 100);

    timeout = setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
    }, 10000);

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      if (visibilityCheckInterval) {
        clearInterval(visibilityCheckInterval);
      }
      if (autocompleteInstanceRef.current) {
        window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstanceRef.current);
        autocompleteInstanceRef.current = null;
      }
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', focusHandler);
        inputRef.current.removeEventListener('input', inputHandler);
      }
    };
  }, [onLocationSelect, onLocationSearchChange]);

  // Update map center only when location changes from external source (like initial load)
  useEffect(() => {
    if (mapRef.current && selectedLocation.lat && selectedLocation.lng) {
      // Check if this is a new location (different from last one)
      const currentKey = `${selectedLocation.lat}-${selectedLocation.lng}`;
      const lastKey = lastSelectedLocationRef.current 
        ? `${lastSelectedLocationRef.current.lat}-${lastSelectedLocationRef.current.lng}`
        : null;
      
      // Only update if location actually changed
      if (currentKey !== lastKey) {
        lastSelectedLocationRef.current = selectedLocation;
        
        // Only update map if this is initial load (no last location) or if it's from search
        // Don't update if user is dragging/zooming
        if (!lastKey) {
          // Initial location - set center and zoom
          setTimeout(() => {
            if (mapRef.current) {
              try {
                mapRef.current.setCenter(selectedLocation);
                mapRef.current.setZoom(15);
              } catch (error) {
                console.error("Error setting initial map center:", error);
              }
            }
          }, 500);
        }
      }
    }
  }, [selectedLocation.lat, selectedLocation.lng]);

  // Reverse geocode to get address when location is set but no search text
  useEffect(() => {
    if (
      selectedLocation.lat && 
      selectedLocation.lng && 
      !locationSearch &&
      mapLoaded
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
  }, [selectedLocation.lat, selectedLocation.lng, locationSearch, onLocationSearchChange, mapLoaded]);

  const defaultCenter = selectedLocation.lat && selectedLocation.lng 
    ? selectedLocation 
    : { lat: 24.8607, lng: 67.0011 };
  const defaultZoom = selectedLocation.lat && selectedLocation.lng ? 15 : 10;

  return (
    <div className="space-y-3">
      <div className="relative z-50">
        <input
          ref={inputRef}
          type="text"
          defaultValue={locationSearch || ""}
          placeholder="Search for a location..."
          className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
          autoComplete="off"
          id="location-search-input"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {/* Global styles for Google Places Autocomplete dropdown */}
      <style jsx global>{`
        .pac-container {
          z-index: 9999 !important;
          border-radius: 8px !important;
          margin-top: 4px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border: 1px solid #e5e7eb !important;
          background-color: white !important;
          font-family: inherit !important;
        }
        .pac-item {
          padding: 12px 16px !important;
          cursor: pointer !important;
          border-top: 1px solid #f3f4f6 !important;
          font-size: 14px !important;
        }
        .pac-item:first-child {
          border-top: none !important;
        }
        .pac-item:hover {
          background-color: #f3f4f6 !important;
        }
        .pac-item-selected {
          background-color: #e5e7eb !important;
        }
        .pac-icon {
          margin-right: 8px !important;
        }
        .pac-matched {
          font-weight: 600 !important;
        }
      `}</style>
      
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
        
        <APIProvider 
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          <Map
            id="location-map"
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            {...(process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID && { mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID })}
            gestureHandling="greedy"
            disableDefaultUI={false}
            zoomControl={true}
            mapTypeControl={true}
            scaleControl={true}
            streetViewControl={false}
            rotateControl={false}
            fullscreenControl={true}
            style={{ height: "100%", width: "100%", display: "block" }}
          >
            {selectedLocation.lat && selectedLocation.lng && (
              <Marker
                position={selectedLocation}
                title="Selected Location"
              />
            )}
            <MapController 
              onMapReady={() => setMapLoaded(true)} 
              mapRef={mapRef}
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

