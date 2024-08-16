import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { Alert } from "react-native";

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
