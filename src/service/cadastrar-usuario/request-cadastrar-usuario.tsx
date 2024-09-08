import { Alert } from "react-native";
import { validaEmail, validarCPF } from "../../utils/util";
import { UsuarioCadastroDto } from "../../model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto";


export const validarCampos = (dados: UsuarioCadastroDto) => {

    var retorno = "";

    if (!dados.nome) {
        retorno +="O campo Nome é obrigatório.";
    }
    if (!dados.email || !validaEmail(dados.email)) {
        retorno +="Insira um email válido.";
    }
    if (!dados.cpf || !validarCPF(dados.cpf)) {
        retorno +="Insira um CPF válido.";
    }
    if (!dados.senha) {
        retorno +="O campo Senha é obrigatório.";
    }
    if (dados.senha !== dados.confirmarSenha) {
        retorno +="As senhas não coincidem.";
    }

    if(retorno != ""){
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
};


export async  function RealizarCadastro(dados: UsuarioCadastroDto) {
    if(!validarCampos(dados)){
        return;
    }

}