import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Platform } from 'react-native';
import TelaSplash from '../screens/area-externa/tela-splash';
import Login from '../screens/area-externa/login';
import CadastrarUsuario from '../screens/area-externa/cadastrar-usuario';
import RouterAreaLogada from './routerAreaLogada';

const Stack = createNativeStackNavigator();

export default function RouterInicial() {

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='TelaSplash' component={TelaSplash}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Cadastro' component={CadastrarUsuario}/>
        <Stack.Screen name='RouterAreaLogada' component={RouterAreaLogada}/>
       
    </Stack.Navigator>
  )
}
