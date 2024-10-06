import { Text, View } from 'react-native'
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
import { mudarData, validateDateTime } from '../../../utils/util'
import { aplicarMascaraDateTime } from '../../../utils/mascara'
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto'


export default function CadastrarCompromisso() {

    const route: RouteProp<{
        params: {
            param: any
        }
    }, 'params'> = useRoute();

    const navigation = useNavigation();
    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet } = usePet();

    const [form, setForm] = useState<CadastrarCompromissoDto>(new CadastrarCompromissoDto(null, "", "", ""));// vai mudar o tipo
    const [notificar, setNotficar] = useState<boolean>(false);
    const [primeira, setPrimeira] = useState(false);


    useEffect(() => {
        if(route.params)
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
        const dado = await PegarCompromisso(usuario.usuario.id, pet.id, route.params.param);
        const compromisso = dado as CompromissoDto;      
        setForm({...form, titulo: compromisso.titulo, data_hora: compromisso.data_hora, descricao: compromisso.descricao, id: compromisso.id});

        var data = new Date(mudarData(compromisso.data_hora))

        if(data > new Date())
            setNotficar(true);

        setPrimeira(true);

        

        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela={route.params?.param == undefined || route.params?.param == "" ? 'Agenda' : "Alterar dados da agenda"} iconBack >
            <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
                <CardImagem image={logoImg} backgroundColor={color.BACKGROUND_CARD_01} usaScroll />
                <View style={styles.viewCentro}>
                    <TextInputPerso
                        titulo={"Título"}
                        setValue={(text: any) => setForm({ ...form, titulo: text })}
                        value={form.titulo}
                    />
                    <TextInputPerso
                        titulo={"Data"}
                        setValue={(text: any) =>{ setForm({ ...form, data_hora: text }), setPrimeira(false)}}
                        value={form.data_hora}
                        iconeRight={"calendar-7"}
                        validacao={validateDateTime(form.data_hora, primeira)}
                        mascara={aplicarMascaraDateTime}
                        numeroDeDigito={16}
                    />
                    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginVertical: 25, justifyContent: 'flex-start' }}>

                        <Switch value={notificar} onValueChange={setNotficar} color={color.COLOR_BUTTON} />
                        <Text style={{ marginRight: 10, fontSize: 15, color: '#000' }}>Receber lembretes automáticos</Text>
                    </View>

                    {route.params?.param == undefined || route.params?.param == "" ?

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

