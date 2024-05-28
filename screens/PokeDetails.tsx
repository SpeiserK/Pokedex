import React, {useState} from 'react';
import {View,Text, Image, Button, ScrollView, StyleSheet} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { Route } from '@react-navigation/native';
import TypeWidget from '../components/TypeWidget';



function PokeDetails ({route}: any){

    //Prefix for name query
    console.log(route.params.pokeId)
    var name = route.params.pokeId;
    
    const {data , error , isLoading} = useGetPokemonByNameQuery({name});
    let pokeMoves = '';
    let initPokeMoves = '';
    var typeCount = false;
    let initBttn = 'Show All Moves';
    let afterBttn = 'Show Less Moves';

    
    //Capitalize first letter of Name/Move
    function capFirstLetter(str: string){
        return str.charAt(0).toUpperCase()+str.slice(1);
    }

    //Fixes Height/Weight values
    function fixHeight(str: number){
        return (str*0.1).toFixed(1);
    }

    //Capitalizes second name of Move
    function capMove(str: string){
       var splitMove = str.split('-');
       return splitMove[0] +' '+ capFirstLetter(splitMove[1]);
    }

    
    
    //Create short list and longer list of all moves
    if(data){
        for(let i = 0; i <data.moves.length;i++){
            var newMove = capFirstLetter(data.moves[i].move.name);
            if(newMove.includes('-')){
                newMove = capMove(newMove);
            }
            if(i < 3){
                initPokeMoves += newMove;
                if(i < 2){
                    initPokeMoves += ', ';
                }
            }
            pokeMoves += newMove;
            if(i < (data.moves.length-1)){
                pokeMoves += ', ';
            }
            if((i+1) % 3 == 0){
                pokeMoves += '\n';
            }
        }
         //Check for multiple types on Pokemon
        if(data.types.length>1){
            typeCount = true;
        }

        //setShowMoves(initPokeMoves);
    }
    
    //State that shows short move list or longer list, button to switch between
    const [showMoves, setShowMoves] = useState(initPokeMoves);
    const [buttonTitle, setButtonTitle] = useState(initBttn);


    function buttonClick (){
        
        if(buttonTitle == initBttn){
            setShowMoves(pokeMoves);
            setButtonTitle(afterBttn);
        }else{
            setShowMoves(initPokeMoves);
            setButtonTitle(initBttn);
        }
        
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={styles.container1}>
            <ScrollView>
            <View style={styles.topBox}>
                <Text style={styles.nameStyle}>{capFirstLetter(data.species.name)}</Text>
                <View style={styles.typeBox}>
                    <TypeWidget type={capFirstLetter(data.types[0].type.name)} />
                    {typeCount ? (
                        <TypeWidget type={capFirstLetter(data.types[1].type.name)}/>
                    ): null}
                </View>
                <View style={styles.imageBox}>
                    <Image
                    source={{
                        uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+data.id+'.png',
                    }}
                    style={{width: 300, height: 300}}
                        />
                </View>
            </View>
                <View style={styles.textBox}>
                    <Text>Height: {fixHeight(data.height)} m | Weight: {fixHeight(data.weight)} kg</Text>
                </View>
            
                <View style={styles.moveBox}>
                    <View>
                        <Text style={styles.moveTitle}>Moveset</Text>
                    </View>
                    <View style={styles.moveList}>
                        <Text style={{fontSize: 15}}>{showMoves}</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button
                        title={buttonTitle}
                        onPress={buttonClick}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
      ) : null}   
    </View>
  );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        width: '92%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'snow',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        margin: 8,
        marginTop: 12,
        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 8
    },
    topBox: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center', 
    },
    imageBox: {
        flex: 2,
        backgroundColor: 'linen',
        borderRadius: 10, 
    },
    textBox: {
        flex: 0,
        alignItems: 'center',
    },
    nameStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    },
    typeBox: {
        flex: 0,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginBottom: 20,
        marginTop: 5
    },
    moveBox: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: 'aliceblue',
        borderRadius: 10,
        marginTop: 40
    },
    moveTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    },
    moveList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10
    },
    buttonBox: {
        borderRadius: 10,
        marginTop: 10
    }
});

export default PokeDetails;