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

  
}

export default function HeaderVoltar({titulo}:HeaderVoltarProps) {

  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={{margin:10}}>
        <Icon name='left-4' size={25} onPress={() => navigation.goBack()}/>
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>

        <Text style={styles.textView}>{titulo}</Text>
      </View>
    </View>
  )
}


