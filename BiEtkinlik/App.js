import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';
import './i18n';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 👈 ekle

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider> {/* 👈 root'a aldık */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.appContainer}>
            <PaperProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <RouterConfig />
              </NavigationContainer>
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
