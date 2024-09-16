import { Text, View } from 'react-native'
import React from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'

export default function Agenda() {

    const navigation = useNavigation<any>();

    return (
        <ContainerAreaLogada nomeTela='Agenda' iconBack >
            <View style={{ flex: 1 }}>
                {/* <FlatList
                    data={pets}
                    renderItem={({ item }) => (
                        <AvatarPet props={item} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                /> */}
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

