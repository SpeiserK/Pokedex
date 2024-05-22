import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    let endReached = 1;
    const {data , error , isLoading} = useGetPokemonByNameQuery('?limit=50&offset=0');

    function handleEndReached(){
        endReached++;
    }

    const navigation = useNavigation();


  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        
      }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 5,
        fontStyle: 'italic',
        color: 'royalblue'
      }}>Pokédex</Text>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
        
          <FlatList
          data={data.results}
          renderItem={({item}) => <PokemonItem name={item.name} />}
          scrollEnabled={true}
          onEndReachedThreshold={2}
          onEndReached={handleEndReached}
          style={{width: '95%'}}
          /> 
        
        </>
      ) : null}
      
    </View>

   
  );
};

export default Home;