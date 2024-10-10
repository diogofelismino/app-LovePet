import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useLoading } from '../../../hooks/useLoading'
import { pegarCompromissos } from '../../../service/agenda/agenda'
import { useUsuario } from '../../../hooks/useUsuario'
import { usePet } from '../../../hooks/usePet'
import CardImgTitulo from '../../../components/cards/card-img-titulo'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'
import { deletarDocumento } from '../../../service/request-padrao-firebase'
import AvatarPet from '../../../components/avatar-pet'
import CardCompromisso from '../../../components/cards/card-compromisso'

export default function Agenda() {

    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet } = usePet();
    const route: RouteProp<{
        params: {
            param: any
        }
    }, 'params'> = useRoute();

    const navigation = useNavigation<any>();
    const foco = useIsFocused();
    const [compromisso, setCompromisso] = useState<CompromissoDto[]>([]);

    useEffect(() => {
        if (foco) {
            if(route?.params)
                navigation.navigate("Cadastrar Compromisso", {param: route?.params?.param});
            else
                buscarCompromisso();

        }

    }, [foco]);

    async function buscarCompromisso() {
        setLoading(true);

        var dadosCompromisso = await pegarCompromissos(usuario.usuario.id, pet.id);
        
        if (dadosCompromisso && Array.isArray(dadosCompromisso)) {

            setCompromisso(dadosCompromisso as CompromissoDto[]);
        } else {
            setCompromisso([]);
       }

        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela='Agenda' iconBack >
            <View style={{ flex: 1}}>
                <FlatList
                    data={compromisso}
                    renderItem={({ item }) => (
                        <CardCompromisso dados={item} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                />
            </View>

            <View style={{ flex: 0.12, alignItems: 'flex-end', justifyContent: 'center', margin: 10 }}>
                <ButtonRound
                    color={COLOR_BUTTON}
                    icone='plus-2'
                    tamanhoButton={50}
                    size={20}
                    colorBorder={'transparent'}
                    colorIcon='tranparent'
                    colorIconInterno={'#FFF'}

                    onClick={() => { navigation.navigate("Cadastrar Compromisso") }}
                />
            </View>
        </ContainerAreaLogada>
    )
}

