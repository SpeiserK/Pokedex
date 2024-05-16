import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';

type PokeProps = {
    name: string;
};

let prefix = '/';

const PokemonItem = (props: PokeProps) => {
  const {data , error , isLoading} = useGetPokemonByNameQuery(prefix.concat(props.name));
  function handlePressIn(name: string){
    console.log('You have pressed '+name);
  }
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
        <TouchableOpacity
        onPress={() =>{
          handlePressIn(props.name);
        }}
        >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+data.id+'.png',
          }}
          style={{width: 40, height: 40}}
        />
          <Text>{props.name} {data.id}</Text>
          
        </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PokemonItem;