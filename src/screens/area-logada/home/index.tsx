import { Text, View } from 'react-native'
import React from 'react'
import { usePet } from '../../../hooks/usePet'

export default function Home() {

  const { pet } = usePet();

  return (
    <View>
      <Text>{pet.nome_pet}</Text>
    </View>
  )
}

