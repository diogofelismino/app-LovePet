import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function CustomTypeIcon({ name, ...props }: any) {
    // Mapeamento de ícones com base no prefixo do nome ou algum critério personalizado
    if (name.startsWith('ion-')) {
        return <Ionicons name={name.replace('ion-', '')} {...props} />;
    } else if (name.startsWith('fa-')) {
        return <FontAwesome name={name.replace('fa-', '')} {...props} />;
    } else if (name.startsWith('md-')) {
        return <MaterialCommunityIcons name={name.replace('md-', '')} {...props} />;
    }
    else if (name.startsWith('ent-')) {
        return <Entypo name={name.replace('ent-', '')} {...props} />;
    }
    else if (name.startsWith('ent-')) {
        return <Entypo name={name.replace('ent-', '')} {...props} />;
    }




    // Ícone padrão se nenhum critério corresponder
    return <Ionicons name={name} {...props} />;
}
