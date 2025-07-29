import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Button, InputAdornment, TextField } from "@mui/material";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DiscoveryMapPanel() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [query, setQuery] = useState("");

  const MAPTILER_API_KEY = "JKyaJvr3yalg5h65ESlT"; // 👈 buraya kendi key’ini koy

  // Harita referansına erişim için
  function MapMover({ lat, lng }) {
    const map = useMap();
    if (lat && lng) {
      map.setView([lat, lng], 15);
    }
    return null;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query
        )}.json?key=${MAPTILER_API_KEY}`
      );

      const result = response.data.features[0];
      if (result) {
        const [lngFound, latFound] = result.center;
        setLat(latFound);
        setLng(lngFound);
      } else {
        alert("Konum bulunamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Arama sırasında hata oluştu.");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });

    return lat && lng ? <Marker position={[lat, lng]} /> : null;
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Adres veya yer ara..."
          variant="filled"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearch} variant="outlined" size="large">
                  Ara
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <MapContainer
        center={[40.939087, 30.516985]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> &copy; OpenStreetMap contributors'
        />
        <MapMover lat={lat} lng={lng} />
        <LocationMarker />
        {lat && lng && <Marker position={[lat, lng]} />}
      </MapContainer>
    </div>
  );
}

export default DiscoveryMapPanel;
