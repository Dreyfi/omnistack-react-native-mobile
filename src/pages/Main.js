import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {

    const [currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadingINitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        loadingINitialPosition();
    }, []);

    if(!currentRegion) {
        return null;
    }

    return (<MapView initialRegion={currentRegion} style={{ flex:1 }}>
        <Marker coordinate={{latitude: -23.5936717, longitude: -46.7917419}} >
            <Image style={styles.avatar} source={{uri: 'https://avatars2.githubusercontent.com/u/3505903?s=460&v=4'}} />
        </Marker>
    </MapView>)
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    }

})

export default Main;