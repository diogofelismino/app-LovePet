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
    value: any,

    /**
    * Deve passar o valor para o input.
    * @type {boolean}
    * @default "false"
    */
    ehSenha?: boolean

    /**
    * Deve passar a função de validação.
    * @type {any}
    */
    validacao?: any

    /**
    * Deve passar o nome do icone que ficara no lado direito.
    * @type {string}
    * @default ""
    */
    iconeRight?: any
}


export default function TextInputPerso({ titulo, setValue, value, ehSenha = false, validacao = true, iconeRight = "" }: TextInputPersoProps) {

    const Label = <Text style={{ color: COLOR_FONT_INPUT }}>{titulo}</Text>;

    return (
        <TextInput
            label={Label}
            value={value}
            onChangeText={text => setValue(text)}
            mode='outlined'
            textColor={COLOR_FONT_INPUT}
            style={styles.input}
            activeOutlineColor={validacao || value.length == 0 ? COLOR_FONT_INPUT : "red"}
            outlineColor={validacao || value.length == 0 ? 'transparent' : "red"}
            theme={
                {
                    roundness: 10,
                }}
            secureTextEntry={ehSenha}
            right={iconeRight != "" ? <TextInput.Icon icon={iconeRight}  disabled/> : null}
        />
    )
}