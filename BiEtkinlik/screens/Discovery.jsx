import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetE_F_Category,
  GetE_F_City,
  GetE_F_CityCategory,
  GetE_F_Date,
  GetE_F_DateCategory,
  GetE_F_DateCity,
  GetE_F_DateCityCategory,
  GetE_UnFiltered,
} from '../redux/slices/discoverySlice';
import DiscoveryEventCard from '../components/Discovery/DiscoveryEventCard';
import { COLORS } from '../constants/colors';
import Loading from '../components/Elements/Loading';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import EventRegisterDialog from '../components/Dialogs/EventRegisterDialog';
import DiscoveryFilterDialog from '../components/Dialogs/DiscoveryFilterDialog';
import { GetAllCategory } from '../redux/slices/categorySlice';
import ReviewLocationDialog from '../components/Dialogs/ReviewLocationDialog';

function Discovery() {
  const dispatch = useDispatch();
  const [UserId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { filterMode, startDate, endDate, cities, categories, discoveryEvents, discoveryLoading } =
    useSelector((store) => store.discovery);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('UserId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  useEffect(() => {
    dispatch(GetAllCategory());
  }, []);

  // Ortak API çağrı fonksiyonu
  const getEvents = useCallback(async () => {
    if (!UserId) return;

    const hasDate = startDate != null && endDate != null;
    const hasCity = cities.length > 0;
    const hasCategory = categories.length > 0;

    if (filterMode) {
      if (hasDate && hasCity && hasCategory) {
        await dispatch(
          GetE_F_DateCityCategory({
            id: UserId,
            start: startDate,
            end: endDate,
            cities,
            categories,
          }),
        );
      } else if (hasDate && hasCity) {
        await dispatch(GetE_F_DateCity({ id: UserId, start: startDate, end: endDate, cities }));
      } else if (hasDate && hasCategory) {
        await dispatch(
          GetE_F_DateCategory({ id: UserId, start: startDate, end: endDate, categories }),
        );
      } else if (hasCity && hasCategory) {
        await dispatch(GetE_F_CityCategory({ id: UserId, cities, categories }));
      } else if (hasDate) {
        await dispatch(GetE_F_Date({ id: UserId, start: startDate, end: endDate }));
      } else if (hasCity) {
        await dispatch(GetE_F_City({ id: UserId, cities }));
      } else if (hasCategory) {
        await dispatch(GetE_F_Category({ id: UserId, categories }));
      }
    } else {
      await dispatch(GetE_UnFiltered(UserId));
    }
  }, [UserId, filterMode, startDate, endDate, cities, categories, dispatch]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // Pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  return (
    <>
      <View style={styles.discoveryContainer}>
        <FlatList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          data={discoveryEvents?.events || []}
          keyExtractor={(item) => item.eventId.toString()}
          renderItem={({ item }) => <DiscoveryEventCard event={item} />}
          contentContainerStyle={{ padding: 7, flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      </View>

      {/* Discovery Loading */}
      <Loading status={discoveryLoading} />

      {/* Register Event Dialog */}
      <EventRegisterDialog />

      {/* Discovery Filter Dialog */}
      <DiscoveryFilterDialog />

      {/* Review Location Dialog */}
      <ReviewLocationDialog />
    </>
  );
}

export default Discovery;

const styles = StyleSheet.create({
  discoveryContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    marginBottom: 50,
    backgroundColor: COLORS.background,
  },
});
