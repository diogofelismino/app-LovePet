import { Alert } from "react-native";
import { auth } from "../../config/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { cripitografarSenha, validaEmail, validarCPF } from "../../utils/util";
import { UsuarioEditarDto } from "../../model/Dto/editar-usuario-dto/editar-usuario-dto";
import { updateDocumento } from "../request-padrao-firebase";

export const validarCampos = (dados: UsuarioEditarDto) => {

    var retorno = "";

    if (!dados.nome) {
        retorno += "O campo Nome é obrigatório.";
    }

    if (!dados.cpf || !validarCPF(dados.cpf)) {
        retorno += "Insira um CPF válido.";
    }


    if ((dados.confirmarSenha || dados.novaSenha) && !dados.senhaAtual) {
        retorno += "O campo Senha Atual é obrigatório.";
    }
    if ((dados.novaSenha !== dados.confirmarSenha) && (dados.novaSenha && dados.confirmarSenha)) {
        retorno += "A Nova Senha não é igual ao Confirmar Senha.";
    }

    if ((dados.senhaAtual || dados.confirmarSenha) && !dados.novaSenha) {
        retorno += "O Campo Nova Senha é obrigatório";
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
};



export async function AtualizarSenha(senhaAtual: any, novaSenha: any) {
    const user = auth.currentUser;
    const email = user?.email ? user.email : ""
    const credenciais = EmailAuthProvider.credential(email, senhaAtual);

    if (!user) {
        return "Nenhum usuário autenticado.";
    }

    try {
        await reauthenticateWithCredential(user, credenciais);
        await updatePassword(user, novaSenha);

        return ""
    } catch (error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code) {
           
            if (firebaseError.code === 'auth/wrong-password') {
                return "A senha atual está incorreta.";
            } else if (firebaseError.code === 'auth/weak-password') {
                return "A nova senha é muito fraca. Escolha uma senha mais forte.";
            } else {
                return "Ocorreu um erro ao tentar atualizar a senha. Tente novamente.";
            }
        } else {
           return "Ocorreu um erro desconhecido.";
        }
    }
}

export async function EditarDadoUsuario(dados: UsuarioEditarDto, navigation: any, signIn: any) {
    try {
        if (!validarCampos(dados)) {
            return;
        }

        if (dados.novaSenha) {
            var retorno = await AtualizarSenha(dados.senhaAtual, dados.novaSenha);

            if (retorno != "") {
                Alert.alert("Error", retorno)
                return;
            }
        }

        var usuario = {
            nome: dados.nome,
            senha: dados.novaSenha.length > 0 ? cripitografarSenha(dados.novaSenha) : dados.senhaCripitografada,
            cpf: dados.cpf,
            email: dados.email,
            id: dados.id
        }
        await updateDocumento("Usuario", usuario.id, usuario);

        signIn(usuario, dados.token);

        Alert.alert("Aviso", "Usuario atualizado com sucesso");
        navigation.navigate("Home");
    }
    catch (erro: any) {
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Editar o Usuario, tente novemante mais tarde.");
    }

} 