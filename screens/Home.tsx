import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameQuery } from '../services/pokemon';

const Home = () => {
    let endReached = 1;
    const {data , error , isLoading} = useGetPokemonByNameQuery('?limit=50&offset=10');

    function handleEndReached(){
        endReached++;
    }
    

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