import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Image } from 'react-native';


const CharacterDetailsScreen = ({ route }) => {

    const [characters, setCharacters] = useState([])
    const selectedCharacter = route.params.item;
    console.log(selectedCharacter.image)

    const dataFromAPI = async () => {

        const episodes = []
        for (const episodeLink of selectedCharacter.episode) {
            const episodeNumber = episodeLink.substring(episodeLink.lastIndexOf('/') + 1)
            episodes.push(episodeNumber)
        }
        const apiURL = `https://rickandmortyapi.com/api/episode/[${episodes}]`
        console.log(apiURL);
        try {
            const response = await fetch(apiURL)
            const responseJson = await response.json();
            setCharacters(responseJson)
        } catch (error) { console.log(err) }


    }

    useEffect(() => {
        dataFromAPI()
    }, [])


    const renderDetails = ({ item }) => (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 16 }}>{item.episode} : {item.name}</Text>
                    <Text style={{ fontSize: 16 }}>Original Air Date : {item.air_date}</Text>

                </View>
            </View>
        </View>

    )



    return (
        <View>
            <Image style={{ width: 400, height: 300 }} source={{ uri: selectedCharacter.image }} />
            <Text style={{ fontSize: 24 }}>{selectedCharacter.name}</Text>
            <Text style={{ fontSize: 18 }}>{selectedCharacter.species}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 , color:'red'}}>Episodes List : </Text>

            <FlatList style={{ marginTop: 5 }}
                data={characters}
                keyExtractor={(item) => { return item.id }}
                renderItem={renderDetails}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,

    },
    textInputBox: {
        margin: 10,
        height: 40,
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: '#888888',
        backgroundColor: '#FFFFFF'
    },
    text: {
        position: 'absolute',
        height: 35,
        bottom: 0,
        width: 400,
        justifyContent: 'center',
        color: "white",
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: "#000000c0"
    },
    statusUnknown: {
        position: 'absolute',
        height: 35,
        right: 0,
        top: 0,
        width: 90,
        justifyContent: 'center',
        color: "white",
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: "#4d4d4d",
    },
    statusAlive: {
        position: 'absolute',
        height: 35,
        right: 0,
        top: 0,
        width: 55,
        justifyContent: 'center',
        color: "white",
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: "#00b300"
    },
    statusDead: {
        position: 'absolute',
        height: 35,
        right: 0,
        top: 0,
        width: 55,
        justifyContent: 'center',
        color: "white",
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: "#b30000"
    }
});

export default CharacterDetailsScreen;