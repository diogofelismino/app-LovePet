import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker';
import { combineDateAndTime } from '../../utils/util';

interface DataPickerPros{
    /**
    * Deve passar o proprieda open para saber quando abrir o a modal de dias
    * @type {boolean}
    * @default false
    */
    open: boolean;

    /**
    * Deve passar o proprieda setOpen para saber quando fechar a modal de dias
    * @type {void}
    * @default null
    */
    setOpen:(retorno: boolean) => void;

    /**
    * Deve passar o proprieda quuando for controlar se é o primeiro acesso de data ou não
    * @type {void}
    * @default null
    */
    setPrimeira?: (retorno: boolean) => void;

    /**
    * Deve ser usada para captura o retorno com a data.
    * @type {void}
    * @default null
    */
    onRetornoDataHora:(selectedDate: Date) => void;

    /**
    * Deve ser usada para passar a data caso tenha alguma.
    * @type {Date}
    * @default null
    */
    data: Date

/**
    * Deve ser usada controlar a data selecionada.
    * @type {Date}
    * @default null
    */
    setData:(selectedDate: Date) => void;
}

export default function DataPicker(props: DataPickerPros) {

    const [time, setTime] = useState<Date>(new Date());
    const [open2, setOpen2] = useState(false);

    return (
        <View>
            <DatePicker
                modal
                open={props.open}
                confirmText={'Confirmar'}
                style={{ borderWidth: 0 }}
                cancelText={'Cancelar'}
                title={'Selecione a Data'}
                date={props.data}
                locale={'pt_BR'}
                mode="date"
                onConfirm={(dateConfirm) => {
                    props.setOpen(false);
                    props.setData(dateConfirm);
                    setOpen2(true)
                }}
                onCancel={() => { props.setOpen(false) }}
            />

            <DatePicker
                modal
                open={open2}
                confirmText={'Confirmar'}
                style={{ borderWidth: 0 }}
                cancelText={'Cancelar'}
                title={'Selecione a Hora'}
                date={props.data}
                locale={'pt_BR'}
                mode="time"
                onConfirm={(dateConfirm) => {
                    setOpen2(false);
                   
                    var retorno = combineDateAndTime(props.data, dateConfirm.getHours(), dateConfirm.getMinutes());
                    props.onRetornoDataHora(retorno);
                    props.setData(dateConfirm)

                    if(props.setPrimeira)
                        props.setPrimeira(false);
                }}
                onCancel={() => setOpen2(false)}
                is24hourSource='locale'
            />
        </View>
    )
}

const styles = StyleSheet.create({})