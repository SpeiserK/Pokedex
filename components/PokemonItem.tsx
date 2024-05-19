import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { NavigationAction, useNavigation } from '@react-navigation/native';

type PokeProps = {
    name: string;
    
};

let prefix = '/';


function PokemonItem (props: PokeProps) {
  const navigation = useNavigation(); 
  const {data , error , isLoading} = useGetPokemonByNameQuery(prefix.concat(props.name));
  function handlePressIn(name: string){
    
    console.log('You have pressed '+name);
    navigation.navigate('PokeDetails' as never, {pokeId: props.name} as never);
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
          style={{width: 96, height: 96}}
        />
          <Text>{props.name} {data.id}</Text>
          
        </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PokemonItem;