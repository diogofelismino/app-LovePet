import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../../components/container-area-logada'
import CardImagem from '../../../../components/cards/card-imagem'
import TextInputPerso from '../../../../components/text-input'
import * as color from '../../../../styles/colors'
import logoImg from "../../../../assets/img/vacina.png"
import styles from './styles'
import { converterDataParaString, validateDateTime } from '../../../../utils/util'
import { aplicarMascaraDateTime } from '../../../../utils/mascara'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useLoading } from '../../../../hooks/useLoading'
import { useUsuario } from '../../../../hooks/useUsuario'
import { usePet } from '../../../../hooks/usePet'
import { Button } from 'react-native-paper'
import { VacinaDto } from '../../../../model/Dto/vacina-dto/vacina-dto'
import { ExcluirVacina, PegarVacinasId, RegistrarVacina } from '../../../../service/carteira-de-vacina/carteira-de-vacina'

export default function CadastrarVacinas() {
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


    const [form, setForm] = useState<VacinaDto>(new VacinaDto(null, "", "", ""));
    const [primeira, setPrimeira] = useState<boolean>(false);

    useEffect(() => {
        if (route?.params?.param?.idCard)
            RecuperarVacinas();
    }, []);


    async function Cadastar() {
        setLoading(true);

        await RegistrarVacina(form, usuario.usuario.id, pet.id, navigation);

        setLoading(false);
    }

    async function Excluir() {
        setLoading(true);

        await ExcluirVacina(usuario.usuario.id, pet.id, form.id, navigation);

        setLoading(false);
    }

    async function Editar() {
        setLoading(true);

        //await EditarCompromisso(form, usuario.usuario.id, pet.id, navigation, notificar)

        setLoading(false);
    }

    async function RecuperarVacinas() {
        setLoading(true);
        const dado = await PegarVacinasId(usuario.usuario.id, pet.id, route.params.param.idCard);
        const vacina = dado as VacinaDto;
        setForm({
            ...form,
            nome_vacina: vacina.nome_vacina,
            data_aplicacao: converterDataParaString(new Date(vacina.data_aplicacao)),
            proxima_dose: vacina.proxima_dose == null || vacina.proxima_dose == "" ? "" : converterDataParaString(new Date(vacina.proxima_dose)),
            id: vacina.id
        });

        setPrimeira(true);
        setLoading(false);
    }

    return (
        <ContainerAreaLogada
            nomeTela={route.params?.param?.idCard == undefined || route.params?.param?.idCard == "" ? "Cadastrar vacinas" : "Vacinas"}
            iconBack
        >
            <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
                <CardImagem image={logoImg} backgroundColor={color.BACKGROUND_CARD_01} usaScroll />
                <View style={styles.viewCentro}>
                    {route.params?.param?.idCard == undefined || route.params?.param?.idCard == "" &&

                        <View style={{ width: '90%' }}>
                            <Text style={styles.titulo}>Data de aplicação da vacinas anteriores</Text>
                        </View>
                    }


                    <TextInputPerso
                        titulo={"Data de aplicação"}
                        setValue={(text: any) => { setForm({ ...form, data_aplicacao: text }), setPrimeira(false) }}
                        value={form.data_aplicacao}
                        iconeRight={"calendar-7"}
                        validacao={validateDateTime(form.data_aplicacao, primeira, true)}
                        mascara={aplicarMascaraDateTime}
                        numeroDeDigito={16}
                    />

                    <TextInputPerso
                        titulo={"Tipo da vacina"}
                        setValue={(text: any) => setForm({ ...form, nome_vacina: text })}
                        value={form.nome_vacina}
                        iconeRight={"eyedropper"}
                    />

                    <View style={{ width: '90%', marginTop: 15 }}>
                        <Text style={styles.titulo}>Data da próxima aplicação da vacinas</Text>
                    </View>

                    <TextInputPerso
                        titulo={"Data de aplicação"}
                        setValue={(text: any) => { setForm({ ...form, proxima_dose: text }), setPrimeira(false) }}
                        value={form.proxima_dose}
                        iconeRight={"calendar-7"}
                        validacao={validateDateTime(form.proxima_dose, primeira, false)}
                        mascara={aplicarMascaraDateTime}
                        numeroDeDigito={16}
                    />

                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>

                        {route.params?.param == undefined || route.params?.param?.idCard == "" ?

                            <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Cadastar()}>
                                Salvar
                            </Button>
                            :
                            <>
                                <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Excluir()}>
                                    Excluir vacina
                                </Button>

                                <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => Editar()}>
                                    Salvar
                                </Button>
                            </>
                        }
                    </View>

                </View>
            </ScrollView>
        </ContainerAreaLogada>
    )
}
