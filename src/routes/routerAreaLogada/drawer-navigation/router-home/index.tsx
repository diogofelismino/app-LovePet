import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from 'react-native';
import Home from '../../../../screens/area-logada/home';
import EditarUsuario from '../../../../screens/area-logada/editar-usuario';

const Stack = createNativeStackNavigator();

export default function RouterHome() {
  return (
    <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'fade' : 'slide_from_right',
            animationDuration: 500, 
        }}
    >
        <Stack.Screen name='Home' component={Home}  />     
        <Stack.Screen name='EditarUsuario' component={EditarUsuario}/>
     
   
    </Stack.Navigator>
  )
}
