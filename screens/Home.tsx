import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokeSpan from '../components/PokeSpan';
import { Provider } from 'react-redux';
import { store } from '../store';


const Home = () => {
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Pokedex</Text>
      <PokeSpan name={'/blaziken'}/>
     
    </View>
   
  );
};

export default Home;