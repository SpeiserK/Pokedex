import React, { useState } from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameListQuery } from '../services/pokemon';


function Home () {
    //Offset state variable
    const [offset, setOffset] = useState(0)
    //Query call
    var {data , error , isLoading} = useGetPokemonByNameListQuery({offset});
    
    //Update offset when end of list reached
    function handleEndReached(){
        setOffset(offset + 50);
    }

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
          renderItem={({item}) => <PokemonItem name= {item.name}/>}
          scrollEnabled={true}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => {
            if(distanceFromEnd < 0){
                return;
            }
            handleEndReached()
        }}
          style={{width: '95%'}}
          /> 
        </>
      ) : null} 
    </View>
  );
};

export default Home;