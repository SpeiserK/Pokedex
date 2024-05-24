import React, { useState } from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameListQuery } from '../services/pokemon';


function Home () {
    let initQuery = '?limit=50&offset=0';
    const [query, setQuery] = useState(initQuery);
    const [endCount,setEndCount] = useState(1);
    var {data , error , isLoading } = useGetPokemonByNameListQuery(query);

    function handleEndReached(){
        console.log('end reached, reloading');
        setEndCount(endCount+1);
        setQuery('?limit=50&offset='+(endCount*50)); 
        
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
          onEndReachedThreshold={1}
          onEndReached={({distanceFromEnd}) => {
            if(distanceFromEnd < 0){
                console.log(distanceFromEnd);
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