import React, { useState } from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameListQuery } from '../services/pokemon';


function Home () {
    //Offset state variable
    const [offset, setOffset] = useState(0)
    //Query call
    var {data , error , isLoading} = useGetPokemonByNameListQuery({offset});
    //Variable to prevent multiple reloads
    const [reload, setReload] = useState(false);
    
    //Update offset when end of list reached
    function handleEndReached(){
        setOffset(offset + 50);
        setReload(false);
        console.log('offset +50')
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
          renderItem={({item}) => <PokemonItem name= {item.name} url ={item.url}/>}
          scrollEnabled={true}
          onEndReachedThreshold={1}
          onEndReached={({distanceFromEnd}) => {
            if(distanceFromEnd < 0 || reload == true){
                return;
            }
            setReload(true);
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