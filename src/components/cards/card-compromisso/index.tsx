import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardImgTitulo from '../card-img-titulo'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'
import { converterDataParaString } from '../../../utils/util'

interface CardCompromissoProps {
    /**
    * Deve os dadod do compromisso
    * @type {CompromissoDto}
    * @default ""
    */
    dados: CompromissoDto
}


export default function CardCompromisso(props: CardCompromissoProps) {

    const data = converterDataParaString(new Date(props.dados.data_hora));

    return (
        <View style={{ width:'50%' }}>
            <CardImgTitulo titulo={props.dados.titulo} subTitulo={data.split(" ")[0]} fontTitulo={14} fontSubTitulo={16} nomeTelaNavegacao='Cadastrar Compromisso' paramNavigate={{idCard:props.dados.id}} />
        </View>
    )
}

