import { useEffect } from 'react';

export default function RecenterMap({ mapRef, lat, lng, zoom = 14 }) {
  useEffect(() => {
    if (mapRef?.current && lat && lng) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01 / zoom, // zoom seviyesini simüle etme
          longitudeDelta: 0.01 / zoom,
        },
        2000, // animasyon süresi (ms)
      );
    }
  }, [lat, lng, zoom, mapRef]);

  return null;
}
