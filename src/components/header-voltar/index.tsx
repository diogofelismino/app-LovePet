import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from '../icon'

import { useNavigation } from '@react-navigation/native'


interface HeaderVoltarProps {

  /**
  * Deve passar o Titulo do Header.
  * @type {string}
  */
  titulo: string,

  /**
  * Habilita o icone de voltar.
  * @type {boolean}
  */
  voltar?: boolean


}

export default function HeaderVoltar({ titulo, voltar = true }: HeaderVoltarProps) {

  const navigation = useNavigation<any>();

  return (
    <View>
      {voltar &&
        <View style={{ margin: 10 }}>
          <Icon name='left-4' color={"#000"} size={25} onPress={() => navigation.goBack()} />
        </View>
      }

      <View style={{ width: '100%', alignItems: 'center', marginVertical: !voltar ? 12 : 0}}>

        <Text style={styles.textView}>{titulo}</Text>
      </View>
    </View>
  )
}


