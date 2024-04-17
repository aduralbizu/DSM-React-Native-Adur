import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Campobase from './Componentes/CampoBaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Campobase />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}