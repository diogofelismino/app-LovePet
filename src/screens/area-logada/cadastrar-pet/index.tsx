import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import ContainerAreaLogada from '../../../components/container-area-logada'
import CardImagem from '../../../components/cards/card-imagem'
import logoImg from '../../../assets/img/Logo.png'
import * as color from '../../../styles/colors'
import TextInputPerso from '../../../components/text-input'
import { PetDto } from '../../../model/Dto/pets-dto/pet-dto'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from './styles'
import { Button } from 'react-native-paper'
import { calcularIdade } from '../../../service/cadastrar-pet/request-cadastar-pet'

export default function CadastrarPet() {

    const [form, setForm] = useState<PetDto>(new PetDto("", "", 0, "", ""));

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
        if(ano && mes)
            setForm({...form, idade: calcularIdade(Number(ano), mes)})
    }, [ano, mes]);

    return (
        <ContainerAreaLogada nomeTela='Cadastrar pet' iconBack >
            <ScrollView style={{ flex: 1, width: '100%'}} scrollEnabled={!open } showsVerticalScrollIndicator={false}>
                <CardImagem image={logoImg} backgroundColor={color.BACKGROUND_CARD_01} usaScroll/>
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

                    <View style={styles.viewDropDonw}>
                        <View style={{ width: '46%', alignItems: 'flex-start', zIndex: 1 }}>
                            <DropDownPicker
                                items={mesItem}
                                value={mes}
                                setValue={setMes}
                                open={open}
                                setOpen={(setOpen)}
                                setItems={setMesItem}
                                placeholder='mes'
                                placeholderStyle={{ color: color.COLOR_FONT_INPUT }}
                                style={{ borderColor: 'transparent', backgroundColor: color.BACKGROUND_INPUT, marginVertical: 10 }}
                                dropDownContainerStyle={{ borderColor: color.COLOR_FONT_INPUT }}
                                textStyle={{ color: color.COLOR_FONT_INPUT }}
                                scrollViewProps={{ scrollEnabled: false }}
                                zIndex={2000}
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

                    <TextInputPerso
                        titulo={"Sexo"}
                        setValue={(text: any) => setForm({ ...form, sexo: text.toUpperCase() })}
                        value={form.sexo}
                        iconeRight={"venus-double"}
                        numeroDeDigito={1}
                    />


                    <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => console.log(form)}>
                        Entrar
                    </Button>

                </View>
            </ScrollView>
        </ContainerAreaLogada>
    )
}
