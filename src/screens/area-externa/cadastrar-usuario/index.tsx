import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import TextInputPerso from '../../../components/text-input'
import { Button } from 'react-native-paper';
import { validaEmail, validarCPF } from '../../../utils/util';
import HeaderVoltar from '../../../components/header-voltar';
import { aplicarMascaraCPF } from '../../../utils/mascara';

export default function CadastrarUsuario() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");



    return (
        <View style={styles.conteiner} onTouchStart={() => Keyboard.dismiss()}>
            <HeaderVoltar titulo='Criar Conta' />

            <View style={styles.areaViewCentro}>

                <TextInputPerso
                    titulo={"Email"}
                    setValue={setEmail}
                    value={email}
                    iconeRight={"at"}
                    validacao={validaEmail(email)}

                />
                <TextInputPerso
                    titulo={"Nome"}
                    setValue={setNome}
                    value={nome}
                    iconeRight={"account-outline"}
                />
                <TextInputPerso
                    titulo={"CPF"}
                    setValue={setCpf}
                    value={cpf}
                    iconeRight={"card-account-details-outline"}
                    mascara={aplicarMascaraCPF}
                    numeroDeDigito={14}
                    tipoTeclado='numeric'
                    validacao={validarCPF(cpf)}

                />
                <TextInputPerso
                    titulo={"Senha"}
                    setValue={setSenha}
                    value={senha}
                    ehSenha
                    iconeRight={"key-outline"}
                />
                <TextInputPerso
                    titulo={"Confirmar Senha"}
                    setValue={setConfirmarSenha}
                    value={confirmarSenha}
                    ehSenha
                    iconeRight={"key-outline"}
                />


                <Button mode="contained" style={styles.botao} onPress={() => console.log("")}>
                    Cadastrar
                </Button>
            </View>

        </View>
    )
}

