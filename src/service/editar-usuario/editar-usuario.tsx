import { Alert } from "react-native";
import { auth } from "../../config/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";



async function AtualizarSenha(senhaAtual:any, novaSenha:any) {
    const user = auth.currentUser;
    const email = user?.email ? user.email :""
    const credenciais = EmailAuthProvider.credential(email, senhaAtual);

    if (!user) {
        Alert.alert("Erro", "Nenhum usuário autenticado.");
        return;
    }

    try {
        await reauthenticateWithCredential(user, credenciais);
        await updatePassword(user, novaSenha);

        Alert.alert("Sucesso", "Sua senha foi alterada com sucesso!");
    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error) {
            const firebaseError = error as { code: string };
            if (firebaseError.code === 'auth/wrong-password') {
                Alert.alert("Erro", "A senha atual está incorreta.");
            } else if (firebaseError.code === 'auth/weak-password') {
                Alert.alert("Erro", "A nova senha é muito fraca. Escolha uma senha mais forte.");
            } else {
                Alert.alert("Erro", "Ocorreu um erro ao tentar atualizar a senha. Tente novamente.");
            }
        } else {
            Alert.alert("Erro", "Ocorreu um erro desconhecido.");
        }
    }
}