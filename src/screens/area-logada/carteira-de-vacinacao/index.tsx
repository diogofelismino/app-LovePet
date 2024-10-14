import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-animatable'
import styles from './styles'
import logoImg from '../../../assets/img/Logo.png';
import { VacinaDto } from '../../../model/Dto/vacina-dto/vacina-dto'
import { pegarVacinas } from '../../../service/carteira-de-vacina/carteira-de-vacina'
import { useLoading } from '../../../hooks/useLoading'
import { useUsuario } from '../../../hooks/useUsuario'
import { usePet } from '../../../hooks/usePet'
import CardCompromisso from '../../../components/cards/card-compromisso'
import CardVacina from '../../../components/cards/card-vacina'

export default function CarteiraDeVacinacao() {

    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet } = usePet();
    const navigation = useNavigation<any>();
    const foco = useIsFocused();

    const [vacinas, setVacinas] = useState<VacinaDto[]>();

    useEffect(() => {
        if (foco) {
            
            buscarVacinas();

        }

    }, [foco]);

    async function buscarVacinas() {
        setLoading(true);

        var dadosVacinas = await pegarVacinas(usuario.usuario.id, pet.id);
        
        if (dadosVacinas && Array.isArray(dadosVacinas)) {
            setVacinas(dadosVacinas as VacinaDto[]);
        } else {
            setVacinas([]);
       }

        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela='Carteira de vacinação' iconBack >
            <View style={{ flex: 1 }}>
                <FlatList
                    data={vacinas}
                    renderItem={({ item }) => (
                        <CardVacina dados={item} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }} 
                />
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

                        onClick={() => { navigation.navigate("CadastrarVacinas") }}
                    />
                </View>
            </View>
        </ContainerAreaLogada>
    )
}

