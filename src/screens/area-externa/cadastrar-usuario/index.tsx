import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
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

    const validarCampos = () => {
        if (!nome) {
            Alert.alert("Erro", "O campo Nome é obrigatório.");
            return false;
        }
        if (!email || !validaEmail(email)) {
            Alert.alert("Erro", "Insira um email válido.");
            return false;
        }
        if (!cpf || !validarCPF(cpf)) {
            Alert.alert("Erro", "Insira um CPF válido.");
            return false;
        }
        if (!senha) {
            Alert.alert("Erro", "O campo Senha é obrigatório.");
            return false;
        }
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return false;
        }
        return true;
    };

    

    return (
        <View style={styles.conteiner} onTouchStart={() => Keyboard.dismiss()}>
            <HeaderVoltar titulo='Criar Conta' />

            <View style={styles.areaViewCentro}>

                <TextInputPerso
                    titulo={"Email"}
                    setValue={setEmail}
                    value={email}
                    iconeRight={"at-3"}
                    validacao={validaEmail(email)}

                />
                <TextInputPerso
                    titulo={"Nome"}
                    setValue={setNome}
                    value={nome}
                    iconeRight={"user-3"}
                />
                <TextInputPerso
                    titulo={"CPF"}
                    setValue={setCpf}
                    value={cpf}
                    iconeRight={"vcard-1"}
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
                    iconeRight={"key-3"}
                />
                <TextInputPerso
                    titulo={"Confirmar Senha"}
                    setValue={setConfirmarSenha}
                    value={confirmarSenha}
                    ehSenha
                    iconeRight={"key-3"}
                />

                <Button mode="contained" style={styles.botao} onPress={() => console.log("")}>
                    Cadastrar
                </Button>
            </View>

        </View>
    )
}

