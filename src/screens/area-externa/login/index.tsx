import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Logo from "../../../assets/img/Logo.png"
import { Button, TextInput } from 'react-native-paper'
import TextInputPerso from '../../../components/text-input'
import { Value } from 'react-native-reanimated'
import { COLOR_FONT_INPUT, COLOR_TEXT_BLACK } from '../../../styles/colors'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredencial:any) => {
      const user = userCredencial.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorCode == "auth/invalid-credential")
        Alert.alert("Login inválido", "O Email ou a Senha estão incorretos.")
    });
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

          <Button  mode="contained" style={styles.botao} onPress={() => login()}>
            Entrar
          </Button>

          <View style={{marginTop:20}} onTouchStart={() => {navigation.replace("Cadastro")}}>
            <Text style={{ color: COLOR_TEXT_BLACK, fontWeight:'bold' }}>Novo Usúario? Cadastre-se</Text>
          </View>

        </View>

      </View>

      <View style={styles.areaViewCentro}>

      </View>
    </View>
  )
}
