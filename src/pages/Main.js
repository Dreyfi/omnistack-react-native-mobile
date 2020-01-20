import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {

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
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username: 'dreyfi' })
            }}>
                <View style={styles.callout}>
                    <Text style={styles.devName}>Dry F.</Text>
                    <Text style={styles.devBio}>Fullstack developer PHP, Javascript and Flutter.</Text>
                    <Text style={styles.devTechs}>PHP, Javascript and Flutter.</Text>
                </View>
            </Callout>
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
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    }


})

export default Main;