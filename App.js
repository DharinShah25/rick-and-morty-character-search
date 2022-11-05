import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterSearchScreen from './CharacterSearchScreen'
import CharacterDetailsScreen from './CharacterDetailsScreen'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Login' screenOptions={
        {
          headerTitleStyle: { fontWeight: 'bold' }
        }
      }>

        <Stack.Screen component={CharacterSearchScreen} name="CharacterSearchScreen" options={{ headerLeft: (props) => null }}></Stack.Screen>
        <Stack.Screen component={CharacterDetailsScreen} name="CharacterDetailsScreen" ></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
