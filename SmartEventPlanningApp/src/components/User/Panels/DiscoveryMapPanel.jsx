import React, { useState, useEffect, useRef } from "react";
import "../../../css/User/Panels/DiscoveryMapPanel.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

// Marker icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DiscoveryMapPanel() {
  const [lat, setLat] = useState(38.4237);
  const [lng, setLng] = useState(27.1428);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const mapRef = useRef();

  const handleSearch = async () => {
    if (!query) return;

    const accessToken =
      "pk.eyJ1IjoidmF2aXpvZiIsImEiOiJjbWRua2lqcjAxZzBwMmpzNWtwMG9naTE1In0.-lcwjUfggO30ARBeVstZYw"; // pk. ile başlayan token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${accessToken}&limit=5`;

    const response = await axios.get(url);
    const features = response.data.features;

    setResults(features);

    if (features.length > 0) {
      const [lng, lat] = features[0].center;
      setLat(lat);
      setLng(lng);
      const map = mapRef.current;
      if (map) {
        map.flyTo([lat, lng], 15);
      }
    }
  };

  const MapFlyer = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Arama kutusu */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
        <input
          type="text"
          placeholder="Bir yer arayın (halı saha, kafe...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            backgroundColor: "#2c7be5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Ara
        </button>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyer />
        <Marker position={[lat, lng]} />
      </MapContainer>

      <div style={{ marginTop: "10px" }}>
        <strong>Seçilen Konum:</strong>
        <br />
        Latitude: {lat}
        <br />
        Longitude: {lng}
      </div>

      {/* Alternatif sonuçları göstermek istersen */}
      {results.length > 1 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Diğer sonuçlar:</strong>
          <ul>
            {results.slice(1).map((r, i) => (
              <li key={i}>{r.place_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiscoveryMapPanel;
