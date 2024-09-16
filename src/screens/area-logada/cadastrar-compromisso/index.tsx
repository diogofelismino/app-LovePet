import { Text, View } from 'react-native'
import React, { useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import { ScrollView } from 'react-native-gesture-handler'
import CardImagem from '../../../components/cards/card-imagem'
import TextInputPerso from '../../../components/text-input'
import { Button, Switch } from 'react-native-paper'
import styles from './styles'
import * as color from '../../../styles/colors'
import logoImg from "../../../assets/img/calendario.png"
import { CadastrarCompromissoDto } from '../../../model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto'
import { useNavigation } from '@react-navigation/native'
import { useLoading } from '../../../hooks/useLoading'
import { useUsuario } from '../../../hooks/useUsuario'
import { usePet } from '../../../hooks/usePet'
import { RegistrarCompromisso } from '../../../service/cadastrar-compromisso/request-cadastrar-compromisso'
import { validateDateTime } from '../../../utils/util'
import { aplicarMascaraDateTime } from '../../../utils/mascara'


export default function CadastrarCompromisso() {

    const navigation = useNavigation();
    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet } = usePet();


    const [form, setForm] = useState<CadastrarCompromissoDto>(new CadastrarCompromissoDto(null, "", "", null));// vai mudar o tipo
    const [notificar, setNotficar] = useState<boolean>(false);

    async function Cadastar() {
        setLoading(true);

        await RegistrarCompromisso(form, usuario.usuario.id, pet.id, navigation, notificar);

        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela='Agenda' iconBack >
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
                        setValue={(text: any) => setForm({ ...form, data_hora: text })}
                        value={form.data_hora}
                        iconeRight={"calendar-7"}
                        validacao={validateDateTime}
                        mascara={aplicarMascaraDateTime}
                        numeroDeDigito={16}
                    />
                    <View style={{flexDirection:'row', width: '90%', alignItems: 'center', marginVertical: 25, justifyContent:'flex-start' }}>

                        <Switch value={notificar} onValueChange={setNotficar} color={color.COLOR_BUTTON}/>
                        <Text style={{ marginRight: 10, fontSize:15, color:'#000' }}>Receber lembretes automáticos</Text>
                    </View>


                    <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Cadastar()}>
                        Registar
                    </Button>

                </View>
            </ScrollView>
        </ContainerAreaLogada>
    )
}

