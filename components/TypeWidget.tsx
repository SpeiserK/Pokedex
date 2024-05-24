import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


type TypeProps = {
    type: string;
    
};

var typeColor;

function TypeWidget (props: TypeProps) {
    
    switch (props.type){
        case 'Normal':
            typeColor = 'tan';
            break;
        case 'Fire':
            typeColor = 'red';
            break;
        case 'Water':
            typeColor = 'dodgerblue';
            break;
        case 'Electric':
            typeColor = 'gold';
            break;
        case 'Grass':
            typeColor = 'limegreen';
            break;
        case 'Ice':
            typeColor = 'lightskyblue';
            break;
        case 'Fighting':
            typeColor = 'sienna';
            break;
        case 'Poison':
            typeColor = 'mediumorchid';
            break;
        case 'Ground':
            typeColor = 'sandybrown';
            break;
        case 'Flying':
            typeColor = 'cornflowerblue';
            break;
        case 'Psychic':
            typeColor = 'deeppink';
            break;
        case 'Bug':
            typeColor = 'yellowgreen';
            break;
        case 'Rock':
            typeColor = 'peru';
            break;
        case 'Ghost':
            typeColor = 'rebeccapurple';
            break;
        case 'Dragon':
            typeColor = 'mediumslateblue';
            break;
        case 'Dark':
            typeColor = 'darkred';
            break;
        case 'Steel':
            typeColor = 'lightslategrey';
            break;
        case 'Fairy':
            typeColor = 'plum';
            break;
        default:
            typeColor = 'grey';
            break;
    }
 
  return (
    
    <View style={{
        backgroundColor: typeColor,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 4,
        paddingBottom: 4,
        
        }}>
        <Text style={{color: 'white',fontSize:20}}>{props.type}</Text>
    </View>
    
  );
};



export default TypeWidget;