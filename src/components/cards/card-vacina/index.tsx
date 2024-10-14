import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardImgTitulo from '../card-img-titulo'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'
import { converterDataParaString } from '../../../utils/util'
import { VacinaDto } from '../../../model/Dto/vacina-dto/vacina-dto'

interface CardVacinaProps {
    /**
    * Deve os dadod do Vacina
    * @type {VacinaDto}
    * @default ""
    */
    dados: VacinaDto
}


export default function CardVacina(props: CardVacinaProps) {

    const data = converterDataParaString(new Date(props.dados.data_aplicacao));

    return (
        <View style={{ width:'50%' }}>
            <CardImgTitulo titulo={props.dados.nome_vacina} subTitulo={data.split(" ")[0]} fontTitulo={14} fontSubTitulo={16} nomeTelaNavegacao='' paramNavigate={{idCard:props.dados.id}} ehVacina />
        </View>
    )
}

