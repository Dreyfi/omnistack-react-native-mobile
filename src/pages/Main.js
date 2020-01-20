import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

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

    return (
    <>
    <MapView initialRegion={currentRegion} style={{ flex:1 }}>
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
    </MapView>
    <View style={styles.searchForm}>
        <TextInput
            style={styles.searchInput}
            placeholder="Search devs by techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
        />

        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#fff"/>
        </TouchableOpacity>
    </View>
    </>
    )
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
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main;