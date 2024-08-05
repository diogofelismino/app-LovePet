import { Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Logo from "../../../assets/img/Logo.png"
import { Button, TextInput } from 'react-native-paper'
import TextInputPerso from '../../../components/text-input'
import { Value } from 'react-native-reanimated'
import { COLOR_FONT_INPUT, COLOR_TEXT_BLACK } from '../../../styles/colors'

export default function Login() {

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

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

          <Button  mode="contained" style={styles.botao} onPress={() => console.log('Pressed')}>
            Entrar
          </Button>


          <View style={{marginTop:20}} onTouchStart={() => {console.log('Cadastrar')}}>
            <Text style={{ color: COLOR_TEXT_BLACK, fontWeight:'bold' }}>Novo Usúario? Cadastre-se</Text>
          </View>

        </View>
        



      </View>


      <View style={styles.areaViewCentro}>

      </View>
    </View>
  )
}
