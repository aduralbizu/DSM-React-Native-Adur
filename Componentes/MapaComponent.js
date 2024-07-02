import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from "expo-location";


const MapaComponent = () => {

    // ubicacion actual usuario
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0
    });

    // region inicial del mapa Region
    const [Region, setRegion] = useState({
        latitude: 42.815900,
        longitude: -1.642216,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    });

    const [permissionDenied, setPermissionDenied] = useState(false); // denegado por usuario

    useEffect(() => {
        const getLocation = async () => { // solicito permisos de ubi
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
            // si permiso
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords); // actualizo ubi user

            setRegion({ // actualizo region inicial del mapa
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005, // menores valores mayor zoom 
                longitudeDelta: 0.005
                
            });
            console.log("he entrado");
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);

        };

        getLocation();
    }, []);

        // mapview o permiso denegado
    return (
        <View style={styles.container}>
            {permissionDenied ? (
                <View style={styles.permissionDeniedContainer}>
                    <Text style={styles.permissionDeniedText}>
                        Location permission is required to use the map feature.
                    </Text>
                </View>
            ) : (
                // mapview muestra mapa con region inicial 
                <MapView
                    style={styles.map}
                    region={Region} // initialRegion={initialRegion}, con region se actualiza
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
// pantalla completa
export default MapaComponent;