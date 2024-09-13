import { Image, Text, View } from 'react-native'
import React from 'react'
import { usePet } from '../../../hooks/usePet'
import ContainerAreaLogada from '../../../components/container-area-logada';
import { Avatar, Card, Divider } from 'react-native-paper';
import styles from './style';
import logoImg from '../../../assets/img/Logo.png';
import CardImgTitulo from '../../../components/cards/card-img-titulo';

export default function Home() {

  const { pet } = usePet();

  const compromisso = [];//vai ser mudado

  return (
    <ContainerAreaLogada nomeTela='LovePet' home>
      <View style={{ flex: 1, }}>
        {compromisso.length == 0 &&
          <>
            <CardImgTitulo titulo='Carteira de Vacinação' flex ehVacina agedarRegistrar nomeTelaNavegacao='Vacina' />
            <CardImgTitulo titulo='Agendar Compromisso' flex agedarRegistrar nomeTelaNavegacao='Agenda' />
          </>

        }
      </View>

      <View style={styles.viewRodaPe}>
        <Divider style={styles.linha} />
        <Image source={logoImg} resizeMode='contain' style={styles.img} />
      </View>
    </ContainerAreaLogada>
  )
}

