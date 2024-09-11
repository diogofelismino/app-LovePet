import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'
import HeaderVoltar from '../../../components/header-voltar'
import ButtonRound from '../../../components/button-round'
import { COLOR_BUTTON } from '../../../styles/colors'
import AvatarPet from '../../../components/avatar-pet'
import { useUsuario } from '../../../hooks/useUsuario'
import { lerDocumento } from '../../../service/request-padrao-firebase'
import { useNavigation } from '@react-navigation/native'

export default function Perfis() {
  
  const navigation = useNavigation<any>();
  const { usuario } = useUsuario();

  const pets = [//para teste
    { key: '1', name: 'Tom', img: "" },
    { key: '2', name: 'Luky',  img: ""  },
    { key: '3', name: 'Bob', img: ""  },
    { key: '4', name: 'Thor', img: ""  },
    { key: '5', name: 'Zeus', img: ""  },
    { key: '6', name: 'Loki' , img: "" },
  ];

  useEffect(()=> {
    // deve aqui colocara função que irar pegar os pets, sera adicionada apos a criação da tela de cadastro de pet.
    //pegarPet();
  }, [])

  return (
    <View style={styles.conteiner}>
      <HeaderVoltar titulo='Selecione o perfl de seu pet' voltar={false} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={pets}
          renderItem={({ item }) => (
            <AvatarPet name={item.name} />
          )}
          keyExtractor={item => item.key}
          numColumns={2}
          columnWrapperStyle={{justifyContent:'space-evenly'}}
        />
      </View>

      <View style={{ flex: 0.12, alignItems: 'flex-end', justifyContent: 'center', margin: 10 }}>
        <ButtonRound
          color={COLOR_BUTTON}
          icone='plus-2'
          tamanhoButton={40}
          size={24}
          colorBorder={'transparent'}
          colorIcon='tranparent'
          colorIconInterno={'#FFF'}

          onClick={() => { navigation.navigate("CadastrarPet") }}
        />
      </View>
    </View>
  )
}
