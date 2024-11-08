import React from 'react';
import { KeyboardType, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { COLOR_FONT_INPUT } from '../../styles/colors';
import styles from './styles';
import { aplicarMascaraCPF } from '../../utils/mascara';
import Icon from '../icon';

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

    /**
    * Deve passar a função da mascara caso seja necessario usar
    * @type {any}
    * @default ""
    */
    mascara?: any

    /**
    * Deve passar o numero de digito que deve ter no Text Input
    * @type {number}
    * @default ""
    */
    numeroDeDigito?: number

    /**
    * Deve passar o tipo do teclado
    * @type {KeyboardType}
    * @default ""
    */
    tipoTeclado?: KeyboardType

    /**
    * Deve passar quando quiser bloquear o campo
    * @type {boolean}
    * @default false
    */
    bloquearCampo?: boolean

    abrirData?:any

}


export default function TextInputPerso({ titulo, setValue, value, ehSenha = false, validacao = true, iconeRight = "", mascara = null, numeroDeDigito, tipoTeclado = "default", bloquearCampo = false, abrirData}: TextInputPersoProps) {

    const Label = <Text style={{ color: COLOR_FONT_INPUT }}>{titulo}</Text>;

    return (
        <TextInput
            label={Label}
            value={mascara == null ? value : value}
            onChangeText={text => setValue(mascara == null ? text : mascara(text))}
            mode='outlined'
            textColor={COLOR_FONT_INPUT}
            style={ bloquearCampo ? styles.inputDisebled : styles.input}
            activeOutlineColor={validacao || value.length == 0 ? COLOR_FONT_INPUT : "red"}
            outlineColor={validacao || value.length == 0 ? 'transparent' : "red"}
            theme={
                {
                    roundness: 10,
                }}
            secureTextEntry={ehSenha}
            right={iconeRight != "" ? <TextInput.Icon icon={() => (<Icon name={iconeRight} color={COLOR_FONT_INPUT} size={18}/>)}  disabled/> : null}
            maxLength={numeroDeDigito}
            keyboardType={tipoTeclado}
            disabled={bloquearCampo}
            onFocus={() => {
                abrirData ? abrirData(true) : false
            }}
        />
    )
}