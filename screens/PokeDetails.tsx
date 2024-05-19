import React from 'react';
import {View,Text, Image} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { Route } from '@react-navigation/native';

let prefix = '/';

function PokeDetails ({route}){
    
    const {data , error , isLoading} = useGetPokemonByNameQuery(prefix.concat(route.params.pokeId));
    let pokeMoves = '';
    let pokeTypes = '';
    console.log(data.moves.length);
    for(let i = 0; i <data.moves.length;i++){
        pokeMoves += data.moves[i].move.name;
        pokeMoves += ', ';
    }
    for(let k = 0; k <data.types.length;k++){
        pokeTypes += data.types[k].type.name;
        pokeTypes += ', ';
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
        <View>
            <Image
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+data.id+'.png',
          }}
          style={{width: 100, height: 100}}
        />
        <Text>Name: {data.species.name}</Text>
        <Text>Height: {data.height}</Text>
        <Text>Weight: {data.weight}</Text>
        <Text>Type(s): {pokeTypes}</Text>
        <Text>Moves(s): {pokeMoves}</Text>
    
        
        </View>
      ) : null}
      
    </View>
  );
};

export default PokeDetails;