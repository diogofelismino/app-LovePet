import { Platform, Text, View } from 'react-native'
import React from 'react'
import Icon from '../icon'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native'


interface ContainerAreaLogadaProps {

    /**
    * Elementos da Tela.
    * @type {any}
    */
    children?: any

    /**
    * Deve passar o nome da Tela.
    * @type {string}
    */
    nomeTela: string,

    /**
    * Deve passar quando o header tiver o botão de voltar.
    * @type {boolean}
    * @default false
    */
    iconBack?: boolean

    /**
    * Se true desabilita o scroll da tela e se false fica habilitado, valor padrao false.
    * Valor padrão false
    * @type {boolean}
    * @default ={false}
    */
    desabilitarScroll?: boolean

    /**
   * Deve se passado quando se ultilizar autocomplete na tela pois permitirar que o teclado não feche a te que um dos filhos fale para fechar, assim mantendo a barra do autocomplete aparecendo na tela.
   * Valor padrão false
   * @type {boolean}
   * @default ={false}
   */
    controleTapsTeclado?: boolean

}

export default function ContainerAreaLogada(props: ContainerAreaLogadaProps) {

    const navigation = useNavigation();

    const style = styles(props.iconBack);

    return (
        <View style={style.viewGeral}>
            <View style={style.viewHeader}>
                {props.iconBack &&
                    <View style={style.viewIcon}>
                        <Icon name='left-4' size={20} color={"#000"} onPress={() => navigation.goBack()} />
                    </View>
                }

                <View style={style.viewTitulo}>
                    <Text style={style.fontTitle}>{props.nomeTela}</Text>
                </View>
            </View>


            <KeyboardAwareScrollView
                extraScrollHeight={Platform.select({ ios: 50, android: 5 })}
                contentContainerStyle={{ flex:1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={props.desabilitarScroll ? false : true}
                keyboardShouldPersistTaps={props.controleTapsTeclado ? "always" : "never"}
            >
                {props.children}
            </KeyboardAwareScrollView>
        </View>
    )
}

