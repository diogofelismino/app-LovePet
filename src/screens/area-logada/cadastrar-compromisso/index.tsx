import { Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import { ScrollView } from 'react-native-gesture-handler'
import CardImagem from '../../../components/cards/card-imagem'
import TextInputPerso from '../../../components/text-input'
import { Button, Switch } from 'react-native-paper'
import styles from './styles'
import * as color from '../../../styles/colors'
import logoImg from "../../../assets/img/calendario.png"
import { CadastrarCompromissoDto } from '../../../model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useLoading } from '../../../hooks/useLoading'
import { useUsuario } from '../../../hooks/useUsuario'
import { usePet } from '../../../hooks/usePet'
import { EditarCompromisso, ExcluirCompromisso, PegarCompromisso, RegistrarCompromisso } from '../../../service/cadastrar-compromisso/request-cadastrar-compromisso'
import { combineDateAndTime, converterDataParaString, mudarData, validateDateTime } from '../../../utils/util'
import { aplicarMascaraDateTime } from '../../../utils/mascara'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'
import DatePicker from 'react-native-date-picker'
import DataPicker from '../../../components/date-picker'


export default function CadastrarCompromisso() {

    const route: RouteProp<{
        params: {
            param: {
                idCard: any
                retorno: boolean
            }
        }
    }, 'params'> = useRoute();

    const navigation = useNavigation();
    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet } = usePet();

    const [form, setForm] = useState<CadastrarCompromissoDto>(new CadastrarCompromissoDto(null, "", "", ""));// vai mudar o tipo
    const [notificar, setNotficar] = useState<boolean>(false);
    const [primeira, setPrimeira] = useState(false);

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [open2, setOpen2] = useState(false);
    const [time, setTime] = useState<Date>(new Date());


    useEffect(() => {
        if (route?.params?.param?.idCard)
            RecuperarCompromisso();
    }, []);


    async function Cadastar() {
        setLoading(true);

        await RegistrarCompromisso(form, usuario.usuario.id, pet.id, navigation, notificar);

        setLoading(false);
    }

    async function Excluir() {
        setLoading(true);

        await ExcluirCompromisso(usuario.usuario.id, pet.id, form.id, navigation);

        setLoading(false);
    }

    async function Editar() {
        setLoading(true);

        await EditarCompromisso(form, usuario.usuario.id, pet.id, navigation, notificar)

        setLoading(false);
    }

    async function RecuperarCompromisso() {
        setLoading(true);
        const dado = await PegarCompromisso(usuario.usuario.id, pet.id, route.params.param.idCard);
        const compromisso = dado as CompromissoDto;
        setForm({ ...form, titulo: compromisso.titulo, data_hora: converterDataParaString(new Date(compromisso.data_hora)), descricao: compromisso.descricao, id: compromisso.id });

        setDate(new Date(compromisso.data_hora));

        if (new Date(compromisso.data_hora) > new Date())
            setNotficar(true);

        setPrimeira(true);
        setLoading(false);
    }

    return (
        <ContainerAreaLogada
            nomeTela={route.params?.param?.idCard == undefined || route.params?.param?.idCard == "" ? 'Agenda' : "Alterar dados da agenda"}
            iconBack
            nomeTelaRetorno={route?.params?.param?.retorno ? "Agenda" : ""}
        >
            <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
                <CardImagem image={logoImg} backgroundColor={color.BACKGROUND_CARD_01} usaScroll />
                {/* <Image source={logoImg} style={{width:'100%', height:100}} resizeMode='contain'/> */}
                <View style={styles.viewCentro}>
                    <TextInputPerso
                        titulo={"Título"}
                        setValue={(text: any) => setForm({ ...form, titulo: text })}
                        value={form.titulo}
                    />
                    <TextInputPerso
                        titulo={"Data"}
                        setValue={(text: any) => { }}
                        value={form.data_hora}
                        iconeRight={"calendar-7"}
                        validacao={validateDateTime(form.data_hora, primeira)}
                        mascara={aplicarMascaraDateTime}
                        numeroDeDigito={16}
                        abrirData={setOpen}

                    />

                    <DataPicker
                        open={open}
                        setOpen={setOpen}
                        data={date}
                        setData={setDate}
                        setPrimeira={setPrimeira}
                        onRetornoDataHora={(retorno) => setForm({ ...form, data_hora: converterDataParaString(new Date(retorno)) })}
                    />

                    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginVertical: 25, justifyContent: 'flex-start' }}>

                        <Switch value={notificar} onValueChange={setNotficar} color={color.COLOR_BUTTON} />
                        <Text style={{ marginRight: 10, fontSize: 15, color: '#000' }}>Receber lembretes automáticos</Text>
                    </View>

                    {route.params?.param == undefined || route.params?.param?.idCard == "" ?

                        <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Cadastar()}>
                            Registar
                        </Button>
                        :
                        <>
                            <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Excluir()}>
                                Excluir eventos
                            </Button>

                            <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Editar()}>
                                Salvar
                            </Button>
                        </>
                    }
                </View>
            </ScrollView>
        </ContainerAreaLogada>
    )
}

