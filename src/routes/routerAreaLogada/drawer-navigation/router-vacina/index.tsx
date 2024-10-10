import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Platform } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import CarteiraDeVacinacao from '../../../../screens/area-logada/carteira-de-vacinacao';

// import RouterHomeDrawerNavigation from './drawer-navigation';


const Stack = createNativeStackNavigator();

export default function RouterVacina() {
//   const route: RouteProp<{
//     params: {
//         param: any
//     }
// }, 'params'> = useRoute();

  return (
    <Stack.Navigator
        initialRouteName={'Vacinas'}
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='Vacinas' component={CarteiraDeVacinacao}  />     
     
   
    </Stack.Navigator>
  )
}
