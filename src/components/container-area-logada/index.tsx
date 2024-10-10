import { Platform, Text, View } from 'react-native'
import React from 'react'
import Icon from '../icon'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import ButtonRound from '../button-round'
import * as pallete from '../../styles/colors'
import MiniMenu from '../mini-menu'


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


    /**
   * Deve se passado quando a tela for a de Home.
   * Valor padrão false
   * @type {boolean}
   * @default ={false}
   */
    home?: boolean

    /**
   * Deve se passado quando deseja retornar para uma tela em especifico, deve ser ussado junto do iconBack.
   * Valor padrão false
   * @type {string}
   * @default {""}
   */
    nomeTelaRetorno?: string

}

export default function ContainerAreaLogada(props: ContainerAreaLogadaProps) {

    const navigation = useNavigation<any>();

    const style = styles(props.iconBack, props.home);

    function abrirMenu() {
        navigation.dispatch(DrawerActions.openDrawer());
    }


    return (
        <View style={style.viewGeral}>
            <View style={style.viewHeader}>
                {(props.iconBack && !props.home) &&
                    <View style={style.viewIcon}>
                        <Icon name='left-4' size={20} color={"#000"} onPress={() =>props.nomeTelaRetorno ? 
                            //navigation.replace(props.nomeTelaRetorno) 
                            navigation.reset({
                                index: 0,
                                routes: [{ name: props.nomeTelaRetorno }],
                              })
                            
                            : navigation.goBack()} />
                    </View>
                }

                {(!props.iconBack && props.home) &&
                    <View style={style.viewBtnMenu}>
                        <ButtonRound
                            color={pallete.COLOR_BUTTON}
                            colorIcon={'transparent'}
                            tamanhoButton={50}
                            size={25}
                            icone='menu-2'
                            colorBorder={'transparent'}
                            colorIconInterno={pallete.COLOR_WHITE}
                            onClick={abrirMenu} />
                    </View>
                }


                <View style={style.viewTitulo}>
                    <Text style={style.fontTitle}>{props.nomeTela}</Text>
                </View>

                {props.iconBack &&
                    <View style={{flex:1}}/>

                }

                {(!props.iconBack && props.home) &&
                    <View style={style.viewBtnSair}>
                        <Icon name='bell' size={20} color={"#000"} onPress={() => console.log("Vai ser a os alerta fazer com que apareça aqui")} style={{ marginRight: 10 }} />
                        {/* <Icon name='user-outline' size={20} color={"#000"} onPress={() => console.log("Abrir modal com config")} /> */}
                        <MiniMenu/>
                    </View>
                }
            </View>


            <KeyboardAwareScrollView
                extraScrollHeight={Platform.select({ ios: 50, android: 5 })}
                contentContainerStyle={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={props.desabilitarScroll ? false : true}
                keyboardShouldPersistTaps={props.controleTapsTeclado ? "always" : "never"}
            >
                {props.children}
            </KeyboardAwareScrollView>
        </View>
    )
}

