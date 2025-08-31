import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import RouterConfig from './navigation/RouterConfig';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';
import './i18n';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTab from './navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { SetIsLoggedIn } from './redux/slices/authSlice'; // Redux action

function RootNavigator() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(store => store.auth);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem('UserId');
        dispatch(SetIsLoggedIn(userId !== null));
      } catch (e) {
        console.log('AsyncStorage error:', e);
      }
    };
    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn === null
        ? null        // loading, hiç bir şey gösterme
        : isLoggedIn
          ? <BottomTab />
          : <RouterConfig />}
    </NavigationContainer>
  );

}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.appContainer}>
            <PaperProvider>
              <RootNavigator />
            </PaperProvider>
            <Toast />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
});
