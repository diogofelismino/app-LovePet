import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
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

    const navigation = useNavigation<any>();
    const foco = useIsFocused();
    const [compromisso, setCompromisso] = useState<CompromissoDto[]>([]);

    useEffect(() => {
        if (foco) {
            buscarCompromisso();
        }

    }, [foco]);

    async function buscarCompromisso() {
        setLoading(true);


        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "1");
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "2"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "3"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "4"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "5"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "6"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "7"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "8"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "9"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "10"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "11"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "12"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "13"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "14"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "15"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "16"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "17"); 
        // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "18"); 
       // await deletarDocumento(`Usuario/${usuario.usuario.id}/pets/${pet.id}/Compromisso`, "19"); 




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

