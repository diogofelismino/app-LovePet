import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from '../icon';

interface ButtonAroundProps {

    /**
    * Deve passar a cor do botão.
    * @type {string}
    */
    color: string,

    /**
    * Deve se Informar o nome do icone a ser ultilizado.
    * @type {string}
    */
    icone: string,

    /**
    * Define a cor geral do icone.
    * @type {string}
    * @default ""
    */
    colorIcon?:string,

    /**
    * Define a cor da borda do botão.
    * @type {string}
    * @default ""
    */
    colorBorder?: string,

    /**
    * Deve se passar a função do botão que ele irar execultar.
    * @type {void}
    * @default null
    */
    onClick?: () => void,

    /**
    * Define o tamanho do icone.
    * @type {number}
    * @default 26
    */
    size?: number,

    /**
    * Define o tamnho do botão circular.
    * @type {number}
    * @default 55
    */
    tamanhoButton?: number,

    /**
    * Define a cor de fundo do icone em si, apenas o fundo dela.
    * @type {string}
    * @default null
    */
    colorIconInterno?: string 

    /**
    * Gerar Sobra no Botão.
    * @type {boolean}
    * @default false
    */
    sombra?:boolean
}

export default function ButtonRound({ color, icone, colorIcon, onClick, colorBorder, size = 36, tamanhoButton = 55, colorIconInterno, sombra = false}: ButtonAroundProps) {

    const style = styles(color, colorBorder, tamanhoButton, sombra);

    return (
    <TouchableOpacity style={style.buttonAround} onPress={onClick}>
        <Icon name={icone} size={size} color={colorIcon} style={{color:colorIconInterno}}/>
    </TouchableOpacity>
    )
}
