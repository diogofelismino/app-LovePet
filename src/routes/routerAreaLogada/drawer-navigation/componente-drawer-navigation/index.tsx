import { Image, View } from 'react-native'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useLoading } from '../../../../hooks/useLoading';
import { useUsuario } from '../../../../hooks/useUsuario';
import { usePet } from '../../../../hooks/usePet';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import styles from './styles';
import ButtonRound from '../../../../components/button-round';
import { Divider } from 'react-native-paper';
import * as pallete from '../../../../styles/colors'
import Icon from '../../../../components/icon';
import logoImg from '../../../../assets/img/Logo.png'

export default function DrawerDashBoardComponent(props: any) {

    const { state, ...rest } = props;
    const navigation = useNavigation<any>();
    const { signOut } = useUsuario();
    const { deselecionarPet } = usePet();
    const { setLoading } = useLoading();

    const filteredState = {
        ...state,
        routes: state.routes.filter((route: any) => {
            if (route.params && route.params.hidden) {
                return false;
            }
            return route;
        }),
    };

    function trocarPet() {
        setLoading(true);
        deselecionarPet();
        navigation.navigate("Perfis");
        setLoading(false);
    }

    function sair() {
        setLoading(true);
        deselecionarPet();
        signOut();
        navigation.navigate("Login");
        setLoading(false);
    }


    return (
        <DrawerContentScrollView {...rest} state={filteredState} showsVerticalScrollIndicator={false} style={{ backgroundColor: pallete.BACKGROUND_CARD_02 }}>
            <View style={styles.conteinerimg}>
                <View style={styles.areaBtnClose}>
                    <ButtonRound icone='cancel-circled2-1' color={'transparent'} colorBorder='transparent' colorIconInterno='#000' size={30} tamanhoButton={40} onClick={() => navigation.dispatch(DrawerActions.closeDrawer())} />
                </View>
                <Image source={logoImg} resizeMode='contain' style={{width:'100%', height:'100%'}}/>

            </View>

            {/* <HorizontalLine cor={'#B3CFD8'} espesura={0.9} marginVertical={20} /> */}
            <Divider style={styles.linha} />


            <DrawerItemList {...rest} state={filteredState} />



            <DrawerItem label={"Trocar de Perfil"} onPress={trocarPet} inactiveTintColor={pallete.COLOR_TEXT_BLACK}
                labelStyle={{ fontSize: 19 }} icon={() =>
                    <View style={styles.iconTab}>
                        <Icon name='arrows-ccw' size={30} color={pallete.COLOR_TEXT_BLACK} />
                    </View>
                } />

            <DrawerItem label={"Sair"} onPress={sair} inactiveTintColor={pallete.COLOR_TEXT_BLACK}
                labelStyle={{ fontSize: 19 }} icon={() =>
                    <View style={styles.iconTab}>
                        <Icon name='logout' size={30} color={pallete.COLOR_TEXT_BLACK} />
                    </View>
                } />



            {/* <HorizontalLine cor={'#B3CFD8'} espesura={0.9} marginVertical={20} /> */}
            <Divider style={styles.linha} />
        </DrawerContentScrollView>
    )
}

