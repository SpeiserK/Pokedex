import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './screens/Home';
import PokeDetails from './screens/PokeDetails.tsx';

export type RootStackParamList = {
  Home: undefined;
  PokeDetails: { pokeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
type Props = NativeStackScreenProps<RootStackParamList, 'PokeDetails'>;


const App = () => {
  return (
    
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen
          name='PokeDetails'
          component={PokeDetails}
          initialParams={{ pokeId: 'bulbasaur' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  
    
  );
};




export default App;
