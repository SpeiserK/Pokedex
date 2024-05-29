import React, { useState } from 'react';
import {FlatList, Text, View} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import { useGetPokemonByNameListQuery } from '../services/pokemon';


function Home () {
    //Offset state variable
    const [offset, setOffset] = useState(0)

    /*
    Momentum var to prevent FlatList onEndReached calling multiple times
    - Using state for this variable significantly slows performance
    -- const [momentum, setMomentum] = useState(false);
    */
    var momentum = false;
    //Query call
    var {data , error , isLoading, isSuccess} = useGetPokemonByNameListQuery({offset});

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
          initialNumToRender={50}
          maxToRenderPerBatch={50}
          onMomentumScrollBegin={() => {momentum =true}}
          onMomentumScrollEnd={() => {momentum = false}}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            //prevent query call on initial flatlist load or if user is not scrolling
            if(distanceFromEnd < 0 || !momentum){
                return;
            }
            //prevent query call if previous query is still loading
            if(isLoading){
              return;
            }
            //Update offset on end reached, queries next set of pokemon if previous query was successful
            if(isSuccess){
              setOffset(offset + 50);  
            }
        }}
          style={{width: '95%'}}
          /> 
        </>
      ) : null} 
    </View>
  );
};

export default Home;