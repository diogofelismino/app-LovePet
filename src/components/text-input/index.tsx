import React from 'react';
import { Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { COLOR_FONT_INPUT } from '../../styles/colors';
import styles from './styles';

interface TextInputPersoProps {

    /**
    * Deve passar o Titulo do input.
    * @type {string}
    */
    titulo: string,

    /**
    * Deve passar a função que recebe o valor do input.
    * @type {any}
    */
    setValue: any,

    /**
    * Deve passar o valor para o input.
    * @type {string}
    * @default ""
    */
    value:any,
    
        /**
    * Deve passar o valor para o input.
    * @type {boolean}
    * @default "false"
    */
    ehSenha?:boolean
}


export default function TextInputPerso({titulo, setValue, value, ehSenha=false}:TextInputPersoProps) {

    const Label = <Text style={{color:COLOR_FONT_INPUT }}>{titulo}</Text>;

    return(
        <TextInput
        label={Label}
        value={value}
        onChangeText={text => setValue(text)}
        mode='outlined'       
        textColor={COLOR_FONT_INPUT}
        style={styles.input}  
        activeOutlineColor={COLOR_FONT_INPUT}
        outlineColor='transparent'
        theme={
            {
            roundness: 10, 
          }}
          secureTextEntry={ehSenha}
        />
    )
}