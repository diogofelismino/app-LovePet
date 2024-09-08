import { Alert } from "react-native";
import { cripitografarSenha, validaEmail, validarCPF } from "../../utils/util";
import { UsuarioCadastroDto } from "../../model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { criarDocumento } from "../request-padrao-firebase";


export const validarCampos = (dados: UsuarioCadastroDto) => {

    var retorno = "";

    if (!dados.nome) {
        retorno += "O campo Nome é obrigatório.";
    }
    if (!dados.email || !validaEmail(dados.email)) {
        retorno += "Insira um email válido.";
    }
    if (!dados.cpf || !validarCPF(dados.cpf)) {
        retorno += "Insira um CPF válido.";
    }
    if (!dados.senha) {
        retorno += "O campo Senha é obrigatório.";
    }
    if (dados.senha !== dados.confirmarSenha) {
        retorno += "As senhas não coincidem.";
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
};


export async function RealizarCadastro(dados: UsuarioCadastroDto, navigation: any) {
    if (!validarCampos(dados)) {
        return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    const user = userCredential.user;

    var usuario = {
        nome: dados.nome,
        senha: cripitografarSenha(dados.senha),
        cpf: dados.cpf,
        email: dados.email,
        id: user.uid.toString()
    }

    const elemento = await criarDocumento("Usuario", usuario, usuario.id);

    if (elemento)
        navigation.navigate("Login");
    else
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Cadastrar Usuario, tente novemante mais terde.")
}