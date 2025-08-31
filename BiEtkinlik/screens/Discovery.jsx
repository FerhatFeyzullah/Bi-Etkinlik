import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

function Discovery() {

    const dispatch = useDispatch();

    const UserId = AsyncStorage.getItem('UserId');
    const {
        filterMode,
        startDate,
        endDate,
        cities,
        categories,
        discoverySkeletonLoading,
        discoveryEvents,
    } = useSelector((store) => store.discovery);

    const Category = (id, cat) => {
        const data = {
            id: id,
            categories: cat,
        };
        dispatch(GetE_F_Category(data));
    };
    const City = (id, cit) => {
        const data = {
            id: id,
            cities: cit,
        };
        dispatch(GetE_F_City(data));
    };
    const Date = (id, s, e) => {
        const data = {
            id: id,
            start: s,
            end: e,
        };
        dispatch(GetE_F_Date(data));
    };
    const CityCategory = (id, cit, cat) => {
        const data = {
            id: id,
            cities: cit,
            categories: cat,
        };
        dispatch(GetE_F_CityCategory(data));
    };
    const DateCategory = (id, s, e, cat) => {
        const data = {
            id: id,
            start: s,
            end: e,
            categories: cat,
        };
        dispatch(GetE_F_DateCategory(data));
    };
    const DateCity = (id, s, e, cit) => {
        const data = {
            id: id,
            start: s,
            end: e,
            cities: cit,
        };
        dispatch(GetE_F_DateCity(data));
    };
    const DateCityCategory = (id, s, e, cit, cat) => {
        const data = {
            id: id,
            start: s,
            end: e,
            cities: cit,
            categories: cat,
        };
        dispatch(GetE_F_DateCityCategory(data));
    };
    const UnFiltreted = (id) => {
        dispatch(GetE_UnFiltered(id));
    };

    useEffect(() => {
        const id = UserId;
        const hasDate = startDate != null && endDate != null;
        const hasCity = cities.length > 0;
        const hasCategory = categories.length > 0;

        if (filterMode) {

            if (hasDate && hasCity && hasCategory) {
                DateCityCategory(id, startDate, endDate, cities, categories);
            } else if (hasDate && hasCity) {
                DateCity(id, startDate, endDate, cities);
            } else if (hasDate && hasCategory) {
                DateCategory(id, startDate, endDate, categories);
            } else if (hasCity && hasCategory) {
                CityCategory(id, cities, categories);
            } else if (hasDate) {
                Date(id, startDate, endDate);
            } else if (hasCity) {
                City(id, cities);
            } else if (hasCategory) {
                Category(id, categories);
            }
        }
    }, [UserId, filterMode, startDate, endDate, cities, categories]);

    useEffect(() => {
        if (!filterMode) {
            UnFiltreted(UserId);
        }
    }, [UserId, filterMode])

    return (
        <View style={styles.discoveryContainer}>
            {discoveryEvents &&
                discoveryEvents?.events?.map((e) => (
                    <DiscoveryEventCard key={e.eventId} event={e} />
                ))}
        </View>
    )
}

export default Discovery

const styles = StyleSheet.create({
    discoveryContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30
    }
})