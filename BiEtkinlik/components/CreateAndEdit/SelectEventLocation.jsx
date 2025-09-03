import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SetLatitude, SetLongitude } from '../../redux/slices/eventSlice';
import { useTranslation } from 'react-i18next';

function SelectEventLocation({ isError }) {
  const { t: tButton } = useTranslation('button');
  const { t: tInput } = useTranslation('input');

  const dispatch = useDispatch();
  const { createAndEditS_Alert, updateEventProp, isUpdateMode, gaveUpUpdating } = useSelector(
    (store) => store.event,
  );

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [query, setQuery] = useState('');
  const webviewRef = useRef(null);

  const MAPTILER_API_KEY = 'JKyaJvr3yalg5h65ESlT';

  useEffect(() => {
    if (isUpdateMode) {
      setLat(updateEventProp.latitude);
      setLng(updateEventProp.longitude);
    }
  }, [isUpdateMode]);

  useEffect(() => {
    dispatch(SetLatitude(lat));
    dispatch(SetLongitude(lng));
  }, [lat, lng]);

  useEffect(() => {
    setLat(null);
    setLng(null);
    setQuery('');
  }, [createAndEditS_Alert, gaveUpUpdating]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query,
        )}.json?key=${MAPTILER_API_KEY}`,
      );
      const result = response.data.features[0];
      if (result) {
        const [lngFound, latFound] = result.center;
        setLat(latFound);
        setLng(lngFound);
        // Haritayı yeni koordinata taşı
        webviewRef.current.injectJavaScript(`
          map.setView([${latFound}, ${lngFound}], 15);
          if (window.marker) { map.removeLayer(window.marker); }
          window.marker = L.marker([${latFound}, ${lngFound}]).addTo(map);
        `);
      }
    } catch (err) {
      console.error('Konum aranırken hata:', err);
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style> #map { height: 100%; width: 100%; } </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([40.939087, 30.516985], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          window.marker = null;

          map.on('click', function(e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            if (window.marker) { map.removeLayer(window.marker); }
            window.marker = L.marker([lat, lng]).addTo(map);
            window.ReactNativeWebView.postMessage(JSON.stringify({ lat, lng }));
          });
        </script>
      </body>
    </html>`;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        placeholder={tInput('searchAdressOrLocation')}
        value={query}
        onChangeText={setQuery}
      />
      <Button title={tButton('searchLocation')} onPress={handleSearch} />

      <View style={{ flex: 1, marginTop: 10 }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html }}
          javaScriptEnabled={true}
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              setLat(data.lat);
              setLng(data.lng);
            } catch (e) {
              console.error('WebView mesaj parse hatası:', e);
            }
          }}
        />
      </View>
    </View>
  );
}
export default SelectEventLocation;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});
