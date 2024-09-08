import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import TextInputPerso from '../../../components/text-input'
import { Button } from 'react-native-paper';
import { validaEmail, validarCPF } from '../../../utils/util';
import HeaderVoltar from '../../../components/header-voltar';
import { aplicarMascaraCPF } from '../../../utils/mascara';
import { UsuarioCadastroDto } from '../../../model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto';
import { RealizarCadastro } from '../../../service/cadastrar-usuario/request-cadastrar-usuario';

export default function CadastrarUsuario() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [form, setForm] = useState<UsuarioCadastroDto>(new UsuarioCadastroDto(
        "",
        "",
        "",
        "",
        "",));


    return (
        <View style={styles.conteiner} onTouchStart={() => Keyboard.dismiss()}>
            <HeaderVoltar titulo='Criar Conta' />

            <View style={styles.areaViewCentro}>

                <TextInputPerso
                    titulo={"Email"}
                    setValue={(text: any) => setForm({ ...form, email: text })}
                    value={form.email}
                    iconeRight={"at-3"}
                    validacao={validaEmail(form.email)}

                />
                <TextInputPerso
                    titulo={"Nome"}
                    setValue={(text: any) => setForm({ ...form, nome: text })}
                    value={form.nome}
                    iconeRight={"user-3"}
                />
                <TextInputPerso
                    titulo={"CPF"}
                    setValue={(text: any) => setForm({ ...form, cpf: text })}
                    value={form.cpf}
                    iconeRight={"vcard-1"}
                    mascara={aplicarMascaraCPF}
                    numeroDeDigito={14}
                    tipoTeclado='numeric'
                    validacao={validarCPF(form.cpf)}

                />
                <TextInputPerso
                    titulo={"Senha"}
                    setValue={(text: any) => setForm({ ...form, senha: text })}
                    value={form.senha}
                    ehSenha
                    iconeRight={"key-3"}
                />
                <TextInputPerso
                    titulo={"Confirmar Senha"}
                    setValue={(text: any) => setForm({ ...form, confirmarSenha: text })}
                    value={form.confirmarSenha}
                    ehSenha
                    iconeRight={"key-3"}
                />

                <Button mode="contained" style={styles.botao} onPress={() => RealizarCadastro(form)}>
                    Cadastrar
                </Button>
            </View>

        </View>
    )
}

