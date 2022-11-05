import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';


const CharacterSearchScreen = ({ navigation, route, arrayOfEpisodes }) => {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [characters, setCharacters] = useState([])

    const dataFromAPI = async () => {
        const apiURL = 'https://rickandmortyapi.com/api/character/';

        console.log(apiURL);
        try {
            const response = await fetch(apiURL);
            const responseJson = await response.json();
            setCharacters(responseJson.results)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        dataFromAPI()
    }, [])


    const renderCharacterData = ({ item }) => (

        <Pressable onPress={() => { navigation.navigate("CharacterDetailsScreen", { item }) }}>
            <View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground style={{ width: 400, height: 200 }} source={{ uri: `${item.image}` }} resizeMode="cover">
                            {item.status === "Alive" &&
                                <Text style={styles.statusAlive}>
                                    {item.status}
                                </Text>
                            }
                            {item.status === "Dead" &&
                                <Text style={styles.statusDead}>
                                    {item.status}
                                </Text>
                            }
                            {item.status === "unknown" &&
                                <Text style={styles.statusUnknown}>
                                    {item.status}
                                </Text>
                            }
                            <Text style={styles.text}>{item.name}</Text>
                        </ImageBackground>
                        <Text style={{ fontSize: 16 }}>Originally from : {item.origin.name}</Text>
                        <Text style={{ fontSize: 16 }}>Last known location : {item.location.name}</Text>

                    </View>
                </View>
            </View>
        </Pressable>

    )

    const getCharactersOnSearch = async (searchTerm) => {
        try {
            let response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let responseJson = await response.json();
            setCharacters(responseJson.results)

        }
        catch (err) {
            console.error(err)
        }
    }

    const onEnter = () => {
        //it triggers by pressing the enter key

        // pass in search term
        console.log("Entering")
        console.log(searchTerm)
        getCharactersOnSearch(searchTerm)

    };

    return (
        <View>
            <TextInput style={styles.textInputBox}
                placeholder="Enter search term"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={onEnter}
            />
            <FlatList
                data={characters}
                keyExtractor={(item) => { return item.id }}
                renderItem={renderCharacterData}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,

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

export default CharacterSearchScreen;