import { Image, Text, View } from 'react-native'
import React from 'react'
import styles from './styles';

interface CardImagemProps {
    
    /**
    * Deve Passar a cor de fundo do card
    * @type {string}
    * @default ""
    */
    backgroundColor?: string

    /**
    * Deve a imagem
    * @type {any}
    * @default null
    */
    image: any


    
    /**
    * Deve a imagem
    * @type {boolean}
    * @default false
    */
    usaScroll?: boolean
}

export default function CardImagem(props:CardImagemProps) {

    const style = styles(props.backgroundColor, props.usaScroll);

  return (
    <View style={style.card}>
        <Image source={props.image} resizeMode='contain' style={{height:'100%', width:'100%'}}/>
    </View>
  )
}
