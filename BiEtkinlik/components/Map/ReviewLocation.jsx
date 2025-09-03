import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ReviewLocation() {
  const { t: tText } = useTranslation('text');
  const { reviewLatitude, reviewLongitude } = useSelector((store) => store.map);

  const isCoordsValid =
    reviewLatitude && reviewLongitude && !isNaN(reviewLatitude) && !isNaN(reviewLongitude);

  const openMaps = () => {
    if (!isCoordsValid) return;

    const lat = reviewLatitude;
    const lon = reviewLongitude;

    // iOS için Apple Maps, Android için Google Maps
    const scheme = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lon}`,
      android: `google.navigation:q=${lat},${lon}`,
    });

    Linking.openURL(scheme).catch(() => {
      // fallback: openstreetmap
      const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`;
      Linking.openURL(url);
    });
  };

  if (!isCoordsValid) {
    return (
      <View style={styles.warningContainer}>
        <Text style={{ color: 'red' }}>📍 {tText('eventLocationSelectWarning')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tText('eventLocation')}</Text>
      <Text style={styles.coordinates}>
        {reviewLatitude.toFixed(6)}, {reviewLongitude.toFixed(6)}
      </Text>

      <TouchableOpacity style={styles.button} onPress={openMaps}>
        <Icon name="directions" size={22} color="white" />
        <Text style={styles.buttonText}> {tText('getDirections') || 'Yol Tarifi Al'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  warningContainer: {
    padding: 16,
    alignItems: 'center',
  },
});
