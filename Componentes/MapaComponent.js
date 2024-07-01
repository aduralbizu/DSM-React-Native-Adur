import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from "expo-location";


const MapaComponent = () => {

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0
    });

    const [initialRegion, setInitialRegion] = useState({
        latitude: 42.815900,
        longitude: -1.642216,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setPermissionDenied(true);
                Alert.alert(
                    "Location Permission Denied",
                    "Permission to access location was denied. Please enable location permissions in settings to use this feature.",
                    [{ text: "OK" }]
                );
                return;
            }

            setPermissionDenied(false);

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        };

        getLocation();
    }, []);

    return (
        <View style={styles.container}>
            {permissionDenied ? (
                <View style={styles.permissionDeniedContainer}>
                    <Text style={styles.permissionDeniedText}>
                        Location permission is required to use the map feature.
                    </Text>
                </View>
            ) : (
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                >
                    {currentLocation.latitude !== 0 && currentLocation.longitude !== 0 && <Marker
                        coordinate={currentLocation}
                        title="Tu localización"
                    />}

                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default MapaComponent;