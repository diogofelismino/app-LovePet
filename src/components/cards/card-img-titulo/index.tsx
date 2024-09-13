import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ImagemCalendario from '../../../assets/img/calendario.png';
import ImagemVacina from '../../../assets/img/vacina.png';
import styles from './styles';
import * as pallete from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';

interface CardImgTituloProps {

    /**
    * Deve Passar o Titulo do Card
    * @type {string}
    * @default ""
    */
    titulo: string

    /**
    * Deve Passar o SubTitulo do Card
    * @type {string}
    * @default ""
    */
    subTitulo?: string


    /**
    * Deve Passar quando o card for de uma vacina
    * @type {boolean}
    * @default false
    */
    ehVacina?: boolean


    /**
    * Deve Passar quando o card for flex
    * @type {boolean}
    * @default false
    */
    flex?: boolean


    /**
    * Deve Passar quando o card for o primeiro e ainda não houver nenhum registro de compromisso.
    * @type {boolean}
    * @default false
    */
    agedarRegistrar?: boolean

    /**
    * Deve Passar o nome da tela de destino da navegção.
    * @type {string}
    * @default ""
    */
    nomeTelaNavegacao?: string


}

export default function CardImgTitulo(props: CardImgTituloProps) {

    const navigation = useNavigation<any>();

    const color: string[] = [
        pallete.BACKGROUND_CARD_01,
        pallete.BACKGROUND_CARD_02,
        pallete.BACKGROUND_CARD_03,
        pallete.BACKGROUND_CARD_04,
        pallete.BACKGROUND_CARD_05,
        pallete.BACKGROUND_CARD_06,
        pallete.BACKGROUND_CARD_07,
        pallete.BACKGROUND_CARD_08,
        pallete.BACKGROUND_CARD_09
    ]

    const style = styles(color[Math.floor(Math.random() * color.length)], props.flex);

    return (
        <TouchableOpacity style={style.card} onPress={() => {

            if (props.agedarRegistrar)
                navigation.navigate(props.nomeTelaNavegacao);
            else
                navigation.navigate(props.nomeTelaNavegacao);// vai mudar provavel passarei dado por rota;
        }}>
            <View style={style.viewImg}>
                <Image source={props.ehVacina ? ImagemVacina : ImagemCalendario} resizeMode='contain' style={{ width: '70%', height:'60%' }} />
            </View>

            <View style={style.viewTexto}>
                <Text style={style.textTitulo}>{props.titulo}</Text>
                {props.subTitulo &&
                    <Text style={style.textSubtitulo}>{props.subTitulo}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

