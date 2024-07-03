import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Campobase from './Componentes/CampoBaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Toast from 'react-native-toast-message';
const store = ConfigureStore(); //crea el store

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Campobase />
          <StatusBar style="auto" />
          <Toast />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}//Provider es un componente de alto nivel que envuelve la raíz de tu aplicación. Su propósito principal es proporcionar el "store" de Redux a todos los componentes de React en la aplicación

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//StatusBar: Barra de estado.