import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Platform } from 'react-native';
import Agenda from '../../../../screens/area-logada/agenda';
import CadastrarCompromisso from '../../../../screens/area-logada/cadastrar-compromisso';
import { RouteProp, useRoute } from '@react-navigation/native';

// import RouterHomeDrawerNavigation from './drawer-navigation';


const Stack = createNativeStackNavigator();

export default function RouterAgenda() {
  const route: RouteProp<{
    params: {
        param: any
    }
}, 'params'> = useRoute();

  return (
    <Stack.Navigator
        initialRouteName={route.params.param ? 'Cadastrar Compromisso' :  'Agenda'}
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='Agenda' component={Agenda}  />     
        <Stack.Screen name="Cadastrar Compromisso" component={CadastrarCompromisso} initialParams={{param:route.params.param}}/>
   
    </Stack.Navigator>
  )
}
