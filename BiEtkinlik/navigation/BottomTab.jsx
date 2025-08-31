import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Discovery from '../screens/Discovery'
import Recommended from '../screens/Recommended'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import CreateAndEdit from '../screens/CreateAndEdit'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';


const TabArr = [
    { route: 'Discovery', component: Discovery, label: 'Discovery', activeIcon: 'compass', inActiveIcon: 'compass-outline', },
    { route: 'Recommended', component: Recommended, label: 'Recommended', activeIcon: 'thumb-up', inActiveIcon: 'thumb-up-outline' },
    { route: 'Create', component: CreateAndEdit, label: 'Create', activeIcon: 'plus-circle', inActiveIcon: 'plus-circle-outline', },
    { route: 'Chat', component: Chat, label: 'Chat', activeIcon: 'message', inActiveIcon: 'message-outline' },
    { route: 'Profile', component: Profile, label: 'Profile', activeIcon: 'account-circle', inActiveIcon: 'account-circle-outline' },
];

const Icon = MaterialCommunityIcons;

const TabButton = (props) => {
    const { item, onPress, ...rest } = props;
    const focused = rest["aria-selected"];
    const viewRef = useRef(null);

    // useEffect(() => {
    //     AsyncStorage.clear();
    // }, [])

    // useEffect(() => {
    //     const printStorage = async () => {
    //         try {
    //             const keys = await AsyncStorage.getAllKeys();      // tüm key'leri al
    //             const result = await AsyncStorage.multiGet(keys);  // key'lerin değerlerini al

    //             console.log("🔹 AsyncStorage İçeriği:");
    //             result.forEach(([key, value]) => {
    //                 console.log(`${key} => ${value}`);
    //             });
    //         } catch (error) {
    //             console.log("Hata:", error);
    //         }
    //     };

    //     printStorage();
    // }, []);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
        } else {
            viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
            >
                <Icon type={item.type}
                    size={30}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={focused ? COLORS.primary : COLORS.textLight} />
            </Animatable.View>
        </TouchableOpacity>
    )
}



function BottomTab() {
    const Tab = createBottomTabNavigator();

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: insets.bottom }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: '60',
                        position: 'absolute',
                        justifyContent: 'center',
                        marginBottom: 10,
                        alignItems: 'center',
                        backgroundColor: COLORS.card,
                    },

                }}
            >
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component}
                            options={{
                                tabBarShowLabel: true,
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}

                        />
                    )
                })}
            </Tab.Navigator>
        </SafeAreaView>

    )
}

export default BottomTab

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',


    }
})
