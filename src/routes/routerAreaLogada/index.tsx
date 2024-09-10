import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Platform } from 'react-native';
import Perfis from '../../screens/area-logada/perfis';


const Stack = createNativeStackNavigator();

export default function RouterAreaLogada() {

  return (
    <Stack.Navigator
        initialRouteName='Perfis'
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='Perfis' component={Perfis}/>      
    </Stack.Navigator>
  )
}
