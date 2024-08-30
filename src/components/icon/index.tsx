
// import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
// import React from 'react'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import styles from './styles'


// interface IconsProps {

//     /**
//     * Deve passar o nome do icone.
//     * @type {string}
//     */
//     name: string,

//     /**
//     * Deve passar o tamanho do icone.
//     * @type {number}
//     */
//     size: number

//     /**
//     * Deve passar a cor do icone.
//     * @type {number}
//     */
//     color?: string

//     /**
//     * Deve passar estilos do icone.
//     * @type {StyleProp<ViewStyle>}
//     */
//     style?: StyleProp<ViewStyle>

//     /**
//     * Deve passar uma ação void para o icone.
//     */
//     acao?:any

// }

// export default function Icons({ name, size, color, style, acao }: IconsProps) {
//     return (
//         <View style={[style]} onTouchStart={acao}>
//             <MaterialCommunityIcons name={name} size={size} color={color} />
//         </View>
//     )
// }

import { createIconSetFromIcoMoon  } from 'react-native-vector-icons';

import icoMoonConfig  from '../../assets/fonts/selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

export default Icon;
