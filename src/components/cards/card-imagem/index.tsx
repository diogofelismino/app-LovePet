import { Image, Text, View } from 'react-native'
import React from 'react'
import styles from './styles';
import { Avatar } from 'react-native-paper';

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
  * Se o card esta em tela ou usar scroll
  * @type {boolean}
  * @default false
  */
  usaScroll?: boolean

  /**
  * Se o card usa sobra ou não, padrao true;
  * @type {boolean}
  * @default true
  */
  sombra?: boolean

  /**
  * Se o card irar se um avatar grande
  * @type {boolean}
  * @default false
  */
  avatar?: boolean

  /**
  * Deve ser passado caso avatar seja true, ele define o tamanho o avatar que irar aparecer.
  * @type {number}
  * @default 0
  */
  tamanhoAvatar?: number
}

export default function CardImagem(props: CardImagemProps) {

  const style = styles(props.backgroundColor, props.usaScroll, props.sombra);

  return (
    <View style={style.card}>
      {props.avatar ?
        <Avatar.Image size={props.tamanhoAvatar} source={props.image} />
        :

        <Image source={props.image} resizeMode='contain' style={{ height: '100%', width: '100%'}} />
      }

    </View>
  )
}
