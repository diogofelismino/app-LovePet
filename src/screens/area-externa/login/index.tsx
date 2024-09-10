import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Logo from "../../../assets/img/Logo.png"
import { Button, TextInput } from 'react-native-paper'
import TextInputPerso from '../../../components/text-input'
import { COLOR_FONT_INPUT, COLOR_TEXT_BLACK } from '../../../styles/colors'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../service/usuario/request-user'
import { validaEmail } from '../../../utils/util'
import { useLoading } from '../../../hooks/useLoading'

export default function Login() {

  const navigation = useNavigation<any>();
  const { setLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function logar() {
    setLoading(true);
    //var usuario = await login(email, senha);

    //Pegar dados do usuario com o uid e salvar no ansytore atraves de um redux com hook e navegar pagina ;
    navigation.replace("RouterAreaLogada");

    setLoading(false);

    //navegar para proxima tela e trazer os dados do usario e testar e salvar no async storage e criar um loading;
  }

  return (
    <View style={styles.conteiner} onTouchStart={() => Keyboard.dismiss()}>
      <View style={styles.areaViewCentro}>
        <Image source={Logo} resizeMode='contain' />
      </View>

      <View style={styles.areaViewCentro}>
        <View style={{ flex: 0.4 }}>
          <Text style={styles.textView}>
            Bem vindo ao LovePet!
          </Text>
        </View>

        <View style={styles.viewPrincipal}>
          <TextInputPerso
            titulo={"Email"}
            setValue={setEmail}
            value={email}
            validacao={validaEmail(email)}
          />

          <TextInputPerso
            titulo={"Senha"}
            setValue={setSenha}
            value={senha}
            ehSenha
          />

          <View style={styles.viewEsqueceuSenha}>
            <Text style={{ color: COLOR_FONT_INPUT }}>Esqueceu sua Senha ?</Text>
          </View>

          <Button  mode="contained" textColor='#FFF' style={styles.botao} onPress={() => logar()}>
            Entrar
          </Button>

          <View style={{marginTop:20}} onTouchStart={() => {navigation.navigate("Cadastro")}}>
            <Text style={{ color: COLOR_TEXT_BLACK, fontWeight:'bold' }}>Novo Usúario? Cadastre-se</Text>
          </View>

        </View>

      </View>

      <View style={styles.areaViewCentro}>

      </View>
    </View>
  )
}
