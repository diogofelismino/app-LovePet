import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'
import HeaderVoltar from '../../../components/header-voltar'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import AvatarPet from '../../../components/avatar-pet'
import { useUsuario } from '../../../hooks/useUsuario'
import { lerDocumento } from '../../../service/request-padrao-firebase'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { pegarPet } from '../../../service/perfis/request-perfis'
import { useLoading } from '../../../hooks/useLoading'
import { PetDto } from '../../../model/Dto/pets-dto/pet-dto'
import { usePet } from '../../../hooks/usePet'

export default function Perfis() {

  const navigation = useNavigation<any>();
  const { usuario } = useUsuario();
  const {deselecionarPet } = usePet();
  const { setLoading } = useLoading();
  const [pets, setPets] = useState<PetDto[]>([]);
  const foco = useIsFocused();

  useEffect(() => {
    if(foco){
      deselecionarPet();
      buscarPet();
    }
  }, [foco])

  async function buscarPet() {
    setLoading(true);

    var dadosPet = await pegarPet(usuario.id);
    if (dadosPet && Array.isArray(dadosPet)) {
      setPets(dadosPet as PetDto[]);  // Fazendo um cast explícito para PetDto[]
    } else {
      setPets([]);  // Se 'resultado' for 'null', define um array vazio
    }

    setLoading(false);
  }

  return (
    <View style={styles.conteiner}>
      <HeaderVoltar titulo='Selecione o perfil do seu pet' voltar={false} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={pets}
          renderItem={({ item }) => (
            <AvatarPet props={item} />
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

          onClick={() => { navigation.navigate("CadastrarPet") }}
        />
      </View>
    </View>
  )
}
