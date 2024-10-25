import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, View } from 'react-native'
import ContainerAreaLogada from '../../../components/container-area-logada'
import CardImagem from '../../../components/cards/card-imagem'
import pet04 from '../../../assets/img/pets/pet04.jpg'
import * as color from '../../../styles/colors'
import TextInputPerso from '../../../components/text-input'
import { PetDto } from '../../../model/Dto/pets-dto/pet-dto'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from './styles'
import { Button } from 'react-native-paper'
import { calcularIdade, RealizarCadastroPet, RealizarEdicaoPet, RealizarExclusaoPet } from '../../../service/cadastrar-pet/request-cadastar-pet'
import { useLoading } from '../../../hooks/useLoading'
import { useUsuario } from '../../../hooks/useUsuario'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { usePet } from '../../../hooks/usePet'

export default function CadastrarPet() {

    const { setLoading } = useLoading();
    const { usuario } = useUsuario();
    const { pet, deselecionarPet, selecionarPet } = usePet();
    const navigation = useNavigation();

    const route: RouteProp<{
        params: {
            param: boolean
        }
    }, 'params'> = useRoute();

    const foco = useIsFocused();
    const [form, setForm] = useState<PetDto>(new PetDto("", "", 0, "", "", ""));

    const [ano, setAno] = useState("");
    const [open, setOpen] = useState(false);
    const [mesItem, setMesItem] = useState<any[]>([
        { "value": 1, "label": "Janeiro" },
        { "value": 2, "label": "Fevereiro" },
        { "value": 3, "label": "Março" },
        { "value": 4, "label": "Abril" },
        { "value": 5, "label": "Maio" },
        { "value": 6, "label": "Junho" },
        { "value": 7, "label": "Julho" },
        { "value": 8, "label": "Agosto" },
        { "value": 9, "label": "Setembro" },
        { "value": 10, "label": "Outubro" },
        { "value": 11, "label": "Novembro" },
        { "value": 12, "label": "Dezembro" }
    ]);
    const [mes, setMes] = useState<number>(0);

    useEffect(() => {
        if (ano && mes)
            setForm({ ...form, idade: calcularIdade(Number(ano), mes), data_pet: `${mes}/${ano}` })
    }, [ano, mes]);

    useEffect(() => {
        if (foco && route?.params?.param)
            RecuperarPet();
    }, [foco]);

    async function cadastroPet() {
        setLoading(true);
        await RealizarCadastroPet(form, usuario.usuario.id, navigation);
        setLoading(false);
    }

    async function EditarPet() {
        setLoading(true);
        await RealizarEdicaoPet(form, usuario.usuario.id, navigation, deselecionarPet, selecionarPet);
        setLoading(false);
    }

    async function ExcluirPet() {
        setLoading(true);
        await RealizarExclusaoPet(usuario.usuario.id, pet.id, navigation, deselecionarPet);
        setLoading(false);
    }

    async function RecuperarPet() {
        setLoading(true);
        setForm({ ...form, id: pet.id, data_pet: pet.data_pet, idade: pet.id, nome_pet: pet.nome_pet, raca: pet.raca, sexo: pet.sexo });
        var data = pet.data_pet.split("/");
        setMes(Number(data[0]));
        setAno(data[1]);
        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela={route?.params?.param ? 'Dados do pet' : 'Cadastrar pet'} iconBack desabilitarScroll>
            <ScrollView style={{ flex: 1, width: '100%' }} scrollEnabled={false} showsVerticalScrollIndicator={false}>
                <CardImagem image={pet04}  usaScroll sombra={false} avatar tamanhoAvatar={180}/>
                <View style={styles.viewCentro}>
                    <TextInputPerso
                        titulo={"Nome do pet"}
                        setValue={(text: any) => setForm({ ...form, nome_pet: text })}
                        value={form.nome_pet}
                        iconeRight={"clipboard-2"}
                    />
                    <TextInputPerso
                        titulo={"Raça"}
                        setValue={(text: any) => setForm({ ...form, raca: text })}
                        value={form.raca}
                        iconeRight={"paw"}
                    />

                    <View style={[styles.viewDropDonw, ]}>
                        <View style={{ width: '46%', alignItems: 'flex-start' }}>
                            <DropDownPicker
                                items={mesItem}
                                value={mes}
                                setValue={setMes}
                                open={open}
                                setOpen={setOpen}
                                setItems={setMesItem}
                                placeholder='mes'
                                placeholderStyle={{ color: color.COLOR_FONT_INPUT }}
                                style={{ borderColor: 'transparent', backgroundColor: color.BACKGROUND_INPUT, marginVertical: 10 }}
                                dropDownContainerStyle={{ borderColor: color.COLOR_FONT_INPUT }}
                                textStyle={{ color: color.COLOR_FONT_INPUT }}
                                zIndex={3000}
                                zIndexInverse={1000}
                                autoScroll={true}
                                dropDownDirection="TOP"
                            />
                        </View>
                        <View style={{ width: '54%', alignItems: 'flex-end' }}>
                            <TextInputPerso
                                titulo={"Ano"}
                                setValue={(text: any) => setAno(text)}
                                value={ano}
                                tipoTeclado='number-pad'
                                numeroDeDigito={4}
                            />
                        </View>
                    </View>

                    <View style={{width:'100%', alignItems:'center', zIndex:0}}>

                        <TextInputPerso
                            titulo={"Sexo"}
                            setValue={(text: any) => setForm({ ...form, sexo: text.toUpperCase() })}
                            value={form.sexo}
                            iconeRight={"venus-double"}
                            numeroDeDigito={1}
                        />

                        {route?.params?.param ?
                            <>
                                <Button mode="contained" textColor='#FFF' style={[styles.botao, { marginVertical: 5 }]} onPress={() => ExcluirPet()}>
                                    Excluir pet
                                </Button>
                                <Button mode="contained" textColor='#FFF' style={[styles.botao, { marginVertical: 5 }]} onPress={() => EditarPet()}>
                                    Salvar
                                </Button>

                            </>
                            :
                            <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => cadastroPet()}>
                                Registrar
                            </Button>
                        }

                    </View>
                </View>
            </ScrollView>
        </ContainerAreaLogada>
    )
}
