import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    let endReached = 1;
    const {data , error , isLoading} = useGetPokemonByNameQuery('?limit=50&offset=10');

    function handleEndReached(){
        endReached++;
    }

    const navigation = useNavigation();


  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Pokedex</Text>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
        
          <FlatList
          data={data.results}
          renderItem={({item}) => <PokemonItem name={item.name}/>}
          scrollEnabled={true}
          onEndReachedThreshold={2}
          onEndReached={handleEndReached}
          /> 
        
        </>
      ) : null}
      
    </View>

   
  );
};

export default Home;