import React from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ lat, lng, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], zoom, { duration: 3 });
    }
  }, [lat, lng, zoom, map]);

  return null;
}

export default RecenterMap;
