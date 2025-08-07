import React, { useEffect, useState } from "react";
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
import "../../../../css/User/Panels/CreateEventPanel/CreateEventMapPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { SetLatitude, SetLongitude } from "../../../../redux/slices/eventSlice";
import { useTranslation } from "react-i18next";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DiscoveryMapPanel() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");
  const { t: tInput } = useTranslation("input");

  const dispatch = useDispatch();

  const {
    createAndEditS_Alert,
    updateEventProp,
    isUpdateMode,
    gaveUpUpdating,
  } = useSelector((store) => store.event);

  useEffect(() => {
    if (isUpdateMode) {
      setLat(updateEventProp.latitude);
      setLng(updateEventProp.longitude);
    }
  }, [isUpdateMode]);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(SetLatitude(lat));
    dispatch(SetLongitude(lng));
  }, [lat, lng]);

  useEffect(() => {
    setLat(null);
    setLng(null);
  }, [createAndEditS_Alert, gaveUpUpdating]);

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
    <div className="create-event-map-panel">
      <div style={{ width: "100%" }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label={tInput("searchAdressOrLocation")}
          variant="filled"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearch} variant="outlined" size="large">
                  {tButton("searchLocation")}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <MapContainer
        center={[40.939087, 30.516985]}
        zoom={13}
        style={{ height: "444px", width: "100%" }}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
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
