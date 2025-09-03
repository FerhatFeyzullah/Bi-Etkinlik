import { COLORS } from '../constants/colors';
import DiscoveryEventCard from '../components/Discovery/DiscoveryEventCard';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Image, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { GetEventsRecommendedToMe } from '../redux/slices/recommendedSlice';
import noResult from '../assets/eventImage/noResult.png';
import { appStyles } from '../constants/styles';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Elements/Loading';

const Recommended = () => {
  const { t: tText } = useTranslation('text');

  const dispatch = useDispatch();
  const [UserId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { recommendedEvents, recommendedLoading } = useSelector((store) => store.recommended);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('UserId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  const getEvents = useCallback(async () => {
    if (!UserId) return;
    dispatch(GetEventsRecommendedToMe(UserId));
  }, [UserId, dispatch]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  return (
    <>
      {recommendedEvents?.events?.length > 0 ? (
        <View style={styles.recommendedContainer}>
          <FlatList
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={recommendedEvents?.events || []}
            keyExtractor={(item) => item.eventId.toString()}
            renderItem={({ item }) => <DiscoveryEventCard event={item} />}
            contentContainerStyle={{ padding: 7, flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
        </View>
      ) : (
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={[
            appStyles.flexColumn,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          <Image style={{ width: 200, height: 200 }} source={noResult} resizeMode="cover" />
          <Text style={styles.emptyPanelInfo}>{tText('recommendedEmptyPanelInfo')}</Text>
        </ScrollView>
      )}
      {/* Recommended Loading */}
      <Loading status={recommendedLoading} />
    </>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  recommendedContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    marginBottom: 50,
    backgroundColor: COLORS.background,
  },
  emptyPanelInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    marginTop: 10,
  },
});
