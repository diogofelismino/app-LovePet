import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Platform } from 'react-native';
import Agenda from '../../../../screens/area-logada/agenda';
import CadastrarCompromisso from '../../../../screens/area-logada/cadastrar-compromisso';

// import RouterHomeDrawerNavigation from './drawer-navigation';


const Stack = createNativeStackNavigator();

export default function RouterAgenda() {

  return (
    <Stack.Navigator
        initialRouteName='Agenda'
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='Agenda' component={Agenda}/>     
        <Stack.Screen name="Cadastrar Compromisso" component={CadastrarCompromisso}/>
   
    </Stack.Navigator>
  )
}
