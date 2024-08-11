import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import TextInputPerso from '../../../components/text-input'
import { Button } from 'react-native-paper';

export default function CadastrarUsuario() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");



    return (
        <View style={styles.conteiner}>
            <View>
                
            </View>
            <View style={{ width: '100%',alignItems:'center'}}>

                <Text style={styles.textView}>Criar Conta</Text>
            </View>
            <View style={styles.areaViewCentro}>


                <TextInputPerso
                    titulo={"Email"}
                    setValue={setEmail}
                    value={email}

                />
                <TextInputPerso
                    titulo={"Nome"}
                    setValue={setNome}
                    value={nome}

                />
                <TextInputPerso
                    titulo={"CPF"}
                    setValue={setCpf}
                    value={cpf}

                />
                <TextInputPerso
                    titulo={"Senha"}
                    setValue={setSenha}
                    value={senha}
                    ehSenha
                />
                <TextInputPerso
                    titulo={"Confirmar Senha"}
                    setValue={setConfirmarSenha}
                    value={confirmarSenha}
                    ehSenha
                />


                <Button mode="contained" style={styles.botao} onPress={() => console.log("")}>
                    Cadastrar
                </Button>
            </View>

        </View>
    )
}

