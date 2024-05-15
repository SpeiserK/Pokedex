import React from 'react';
import {Text, View, Image} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';

type PokeProps = {
    name: string;
};

let prefix = '/';
//style={{width: 200, height: 200}}

const PokemonItem = (props: PokeProps) => {
  const {data , error , isLoading} = useGetPokemonByNameQuery(prefix.concat(props.name));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+data.id+'.png',
          }}
          style={{width: 40, height: 40}}
        />
        <Text>{props.name} {data.id}</Text>
      
    </View>
  );
};

export default PokemonItem;