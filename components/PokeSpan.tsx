import React from 'react';
import {Text, View, FlatList} from 'react-native';

import { useGetPokemonByNameQuery } from '../services/pokemon';

type PokeProps = {
    name: string;
};


const PokeSpan = (props: PokeProps) => {
    const {data , error , isLoading} = useGetPokemonByNameQuery('?limit=50&offset=0');
    {/*const {data , error , isLoading} = useGetPokemonByNameQuery(props.name);*/}
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          {/*<Text>{data}</Text>*/}
          <FlatList
          data={data.results}
          renderItem={({item}) => <Text>{item.name}</Text>}
          
          />
        </>
      ) : null}
      
    </View>
  );
};




export default PokeSpan;