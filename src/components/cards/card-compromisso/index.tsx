import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardImgTitulo from '../card-img-titulo'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'

interface CardCompromissoProps {
    /**
    * Deve os dadod do compromisso
    * @type {CompromissoDto}
    * @default ""
    */
    dados: CompromissoDto
}


export default function CardCompromisso(props: CardCompromissoProps) {
    const data = props.dados.data_hora.toString().split(" ");
//  navigation.navigate("TelaResultadoNota", {dados: retorno, status: itemStatus, dadosNota: corpo}); 
    return (
        <View style={{ width:'50%' }}>
            <CardImgTitulo titulo={props.dados.titulo} subTitulo={data[0]} fontTitulo={16} fontSubTitulo={18} nomeTelaNavegacao='Cadastrar Compromisso' paramNavigate={props.dados.id} />
        </View>
    )
}

