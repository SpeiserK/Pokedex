import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { NavigationAction, useNavigation } from '@react-navigation/native';

type PokeProps = {
    name: string;
    url: string;
};

//Prefix for query by name
let prefix = '/';

//Capitalize first letter of Name
function capFirstLetter(str: string){
   let capFirst = str.charAt(0).toUpperCase()+str.slice(1);
   if(capFirst.includes('-')){
      let splitName = capFirst.split('-');
      return splitName[0] +' '+ splitName[1].charAt(0).toUpperCase()+splitName[1].slice(1);
   }
  return capFirst;
}

//Get Pokemon Id from URL
function getID(str: string){
  var strArr = str.split('/');
  return strArr[6];
}

function PokemonItem (props: PokeProps) {
  const navigation = useNavigation(); 
  //On press navigate to PokeDetails.tsx
  function handlePressIn(){
    //navigation.navigate('PokeDetails' as never, {pokeId: props.name} as never);
    navigation.navigate('PokeDetails', {pokeId: props.name});
    
  }

  return (
    <TouchableOpacity
        onPress={() =>{
          handlePressIn();
        }}
        >
    <View style={styles.container1}>
      {/* 
        {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={styles.container2}>
          <View>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+data.id+'.png',
              }}
              style={{width: 96, height: 96}}
              />
            </View>
          <View style={styles.textBox}>
            <Text style={styles.nameStyle}>{capFirstLetter(props.name)}</Text>
            
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrowStyle}> {'➤'} </Text>
          </View> 
        </View>
      ) : null}
      */}
      <View style={styles.container2}>
          <View>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+getID(props.url)+'.png',
              }}
              style={{width: 96, height: 96}}
              />
            </View>
          <View style={styles.textBox}>
            <Text style={styles.nameStyle}>{capFirstLetter(props.name)}</Text>
            <Text style={styles.idStyle}>{getID(props.url)}</Text>
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrowStyle}> {'➤'} </Text>
          </View> 
        </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'snow',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 5
  },
  nameStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black'
  },
  idStyle: {
    fontSize: 18
  },
  arrowStyle: {
    fontSize: 25,
  },
  arrowBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 15
  }
});

export default PokemonItem;