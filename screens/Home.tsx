import React from 'react';
import {FlatList, Text, View} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameQuery } from '../services/pokemon';

const Home = () => {

    const {data , error , isLoading} = useGetPokemonByNameQuery('?limit=50&offset=0');

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Pokedex</Text>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          {/*<Text>{data}</Text>*/}
          <FlatList
          data={data.results}
          renderItem={({item}) => <PokemonItem name={item.name}/>}
          scrollEnabled={true}
          />
        </>
      ) : null}
      
    </View>
    
   
  );
};

export default Home;