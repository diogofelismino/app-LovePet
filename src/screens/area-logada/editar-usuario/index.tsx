import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerAreaLogada from '../../../components/container-area-logada'
import TextInputPerso from '../../../components/text-input'
import { validaEmail, validarCPF } from '../../../utils/util'
import { Button } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useLoading } from '../../../hooks/useLoading'
import { UsuarioCadastroDto } from '../../../model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto'
import styles from './styles'
import { aplicarMascaraCPF } from '../../../utils/mascara'
import { UsuarioEditarDto } from '../../../model/Dto/editar-usuario-dto/editar-usuario-dto'
import { useUsuario } from '../../../hooks/useUsuario'
import { EditarDadoUsuario } from '../../../service/editar-usuario/editar-usuario'

export default function EditarUsuario() {

    const navigation = useNavigation<any>();
    const { setLoading } = useLoading();
    const { usuario, signIn } = useUsuario();
    const foco = useIsFocused();

    const [form, setForm] = useState<UsuarioEditarDto>(new UsuarioEditarDto(
        "",
        "",
        "",
        "",
        "",
        "",
        "",));


        useEffect(() => {
            if(foco)
                RecuperarUsuario();
        }, [foco]);


    async function EditarUsuario() {
        setLoading(true);
        await EditarDadoUsuario(form, navigation, signIn);



        setLoading(false);
    }

    async function RecuperarUsuario() {
        setLoading(true);
        setForm({ 
            ...form, 
            id: usuario.usuario.id, 
            cpf: usuario.usuario.cpf, 
            email: usuario.usuario.email, 
            nome: usuario.usuario.nome, 
            senhaCripitografada: usuario.usuario.senha, 
            token: usuario.token
        });
        setLoading(false);
    }

    return (
        <ContainerAreaLogada nomeTela='Alterar informações' iconBack >
            <View style={styles.areaViewCentro}>

                <TextInputPerso
                    titulo={"Email"}
                    setValue={(text: any) => setForm({ ...form, email: text })}
                    value={form.email}
                    iconeRight={"at-3"}
                    validacao={validaEmail(form.email)}
                    tipoTeclado='email-address'
                    bloquearCampo

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
                    titulo={"Senha atual"}
                    setValue={(text: any) => setForm({ ...form, senhaAtual: text })}
                    value={form.senhaAtual}
                    ehSenha

                />
                <TextInputPerso
                    titulo={"Nova Senha"}
                    setValue={(text: any) => setForm({ ...form, novaSenha: text })}
                    value={form.novaSenha}
                    ehSenha

                />
                <TextInputPerso
                    titulo={"Confirmar Senha"}
                    setValue={(text: any) => setForm({ ...form, confirmarSenha: text })}
                    value={form.confirmarSenha}
                    ehSenha
                    iconeRight={"key-3"}
                />

                <Button mode="contained" textColor='#FFF' style={styles.botao} onPress={() => EditarUsuario()}>
                    Salvar
                </Button>
            </View>

        </ContainerAreaLogada>
    )
}

