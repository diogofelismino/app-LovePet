import { Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { ActivityIndicator } from 'react-native-paper'
import { COLOR_BUTTON } from '../../styles/colors'

export default function Spinner() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} color={COLOR_BUTTON}/>
    </View>
  )
}

