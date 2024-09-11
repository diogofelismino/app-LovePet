import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { Alert } from "react-native";
import { validaEmail } from "../../utils/util";

export async function login(email: string, senha: string) {
    return await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredencial:any) => {
      const user = userCredencial.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorCode == "auth/invalid-credential")
        Alert.alert("Login inválido", "O Email ou a Senha estão incorretos.")
    });
  }


  export const validarCampos = (email: string, senha:any) => {

    var retorno = "";

    if (!email || !validaEmail(email)) {
        retorno += "O campo Email é obrigatório.";
    }
    if (!senha) {
        retorno += "O campo Senha é obrigatório.";
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
};
