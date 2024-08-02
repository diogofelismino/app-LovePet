import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RouterInicial from './routerInicial'


export default function Router() {
  return (
    <>
        <NavigationContainer>
            <RouterInicial/>
        </NavigationContainer>
    </>
  )
}