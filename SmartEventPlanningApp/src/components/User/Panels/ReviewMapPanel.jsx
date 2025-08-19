import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../../css/User/Panels/ReviewMapPanel.css";
import RecenterMap from "../../../hooks/RecenterMap";
import { useTranslation } from "react-i18next";
import SatelliteIcon from '@mui/icons-material/Satellite';
import TerrainIcon from '@mui/icons-material/Terrain';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MapIcon from '@mui/icons-material/Map';
import IconButton from "@mui/material/IconButton";

// Leaflet ikonları ayarlanıyor
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🔴 Hedef için kırmızı ikon
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MAPTILER_KEY = "JKyaJvr3yalg5h65ESlT";
const ORS_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImE0YmYxMmU1YjE3OTRkZDdhZjE1YmM5ZWZmZjM4YjVjIiwiaCI6Im11cm11cjY0In0=";

function ReviewMapPanel() {
  const { t: tText } = useTranslation("text");

  const { discoveryLatitude, discoveryLongitude } = useSelector(
    (store) => store.map
  );

  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [viewMode, setViewMode] = useState("streets");

  const formatDuration = (minutes) => {
    const saat = Math.floor(minutes / 60);
    const dakika = Math.round(minutes % 60);

    if (saat === 0) return `${dakika} ${tText("minutes")}`;
    if (dakika === 0) return `${saat} ${tText("hour")}`;
    return `${saat} ${tText("hour")} ${dakika} ${tText("minutes")}`;
  };

  const isCoordsValid =
    discoveryLatitude &&
    discoveryLongitude &&
    !isNaN(discoveryLatitude) &&
    !isNaN(discoveryLongitude);

  // Haritada tıklanılan noktayı kullanıcı konumu olarak al
  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setUserLocation([lat, lng]);
      },
    });
    return null;
  }

  // Rota hesaplama
  useEffect(() => {
    const getRoute = async () => {
      if (!userLocation || !isCoordsValid) return;

      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [userLocation[1], userLocation[0]],
              [discoveryLongitude, discoveryLatitude],
            ],
          },
          {
            headers: {
              Authorization: ORS_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const geometry = response.data.features[0].geometry.coordinates;
        const summary = response.data.features[0].properties.summary;
        const coordsLatLng = geometry.map(([lng, lat]) => [lat, lng]);

        setRouteCoords(coordsLatLng);
        setDistance((summary.distance / 1000).toFixed(2));
        setDuration(parseFloat((summary.duration / 60).toFixed(1)));
      } catch (err) {
        console.error("Rota alınamadı:", err);
      }
    };

    getRoute();
  }, [userLocation, discoveryLatitude, discoveryLongitude]);

  if (!isCoordsValid)
    return (
      <>
        <div className="review-map-title">{tText("eventLocation")}</div>
        <div style={{ color: "red", height: "50%" }}>
          📍 {tText("eventLocationSelectWarning")}
        </div>
      </>
    );
  return (
    <div className="review-map-container">
      <div className="review-map-title">{tText("eventLocation")}</div>
      <hr />
      <MapContainer
        center={[discoveryLatitude, discoveryLongitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/${viewMode}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; OpenStreetMap contributors'
        />

        <LocationSelector />

        {/* Hedef Marker */}
        <Marker
          position={[discoveryLatitude, discoveryLongitude]}
          icon={redIcon}
        />

        {/* Kullanıcı Marker */}
        {userLocation && <Marker position={userLocation} />}

        {/* Rota Çizgisi */}
        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}
        <RecenterMap
          lat={discoveryLatitude}
          lng={discoveryLongitude}
          zoom={14}
        />
      </MapContainer>

      {/* Mesafe & Süre */}
      <div className="r-map-disctance-duration">
        {distance && duration ? (
          <>
            🚗 <strong>{tText("distance")}:</strong> {distance} km –{" "}
            <strong>{tText("duration")}:</strong> {formatDuration(duration)}
          </>
        ) : !userLocation ? (
          <>🔘 {tText("eventSelectYourLocation")}</>
        ) : null}
      </div>
      {/*Gorunum Modu */}
      <div className="flex-column r-map-view-mode-button">
        <IconButton sx={{ backgroundColor: "#fff", border: "1px solid grey", marginBottom: "10px" }}
          onClick={() => setViewMode("streets")}
        >
          <MapIcon />
        </IconButton>
        <IconButton sx={{ backgroundColor: "#fff", border: "1px solid grey", marginBottom: "10px" }}
          onClick={() => setViewMode("satellite")}
        >
          <SatelliteIcon />
        </IconButton>
        <IconButton sx={{ backgroundColor: "#fff", border: "1px solid grey", marginBottom: "10px" }}
          onClick={() => setViewMode("outdoor")}
        >
          <TerrainIcon />
        </IconButton>
        <IconButton sx={{ backgroundColor: "#fff", border: "1px solid grey", marginBottom: "10px" }}
          onClick={() => setViewMode("basic")}
        >
          <Brightness5Icon />
        </IconButton>
        <IconButton sx={{ backgroundColor: "#fff", border: "1px solid grey" }}
          onClick={() => setViewMode("dataviz")}

        >
          <ShowChartIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ReviewMapPanel;
