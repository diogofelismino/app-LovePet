import { Text, View } from 'react-native'
import React from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-animatable'
import styles from './styles'
import logoImg from '../../../assets/img/Logo.png';

export default function CarteiraDeVacinacao() {

    const navigation = useNavigation<any>();

    return (
        <ContainerAreaLogada nomeTela='Carteira de vacinação' iconBack >
            <View style={{ flex: 1 }}>
                {/* <FlatList
                    data={compromisso}
                    renderItem={({ item }) => (
                        <CardCompromisso dados={item} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }} 
                />*/}
            </View>

            <View style={styles.viewFooter}>

                <View style={{ flex: 1, alignItems: 'center' }}></View>
                <View style={styles.viewImg}>
                    <Image source={logoImg} resizeMode='contain' style={[styles.img]} />
                    <Text style={styles.texto}>LovePet</Text>
                </View>


                <View style={styles.viewBtn}>

                    <ButtonRound
                        color={COLOR_BUTTON}
                        icone='plus-2'
                        tamanhoButton={50}
                        size={20}
                        colorBorder={'transparent'}
                        colorIcon='tranparent'
                        colorIconInterno={'#FFF'}

                        //onClick={() => { navigation.navigate("CadastrarVacina") }}
                    />
                </View>
            </View>
        </ContainerAreaLogada>
    )
}

