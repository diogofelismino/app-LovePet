import { Alert } from "react-native";
import { PetDto } from "../../model/Dto/pets-dto/pet-dto";

export const validarCampos = (dados: PetDto) => {

    var retorno = "";

    if (!dados.nome_pet) {
        retorno += "O campo Nome do pet é obrigatório. ";
    }
    if (!dados.raca) {
        retorno += "O campo Raça é obrigatório. ";
    }
    if (!dados.idade) {
        retorno += "Os campos mes e ano devem esta peenchidos. ";
    }
    if (!dados.sexo) {
        retorno += "O campo Sexo é obrigatório.";
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
};

export function calcularIdade(ano:number, mes:number){
    const dataAtula  = new Date();
    const anoAtual = dataAtula.getFullYear();
    const mesAtual = dataAtula.getMonth() + 1;


    let idade = anoAtual - ano;

    if (mesAtual < mes || (mesAtual === mes && dataAtula.getDate() < 1)) {
        idade--;
    }

    return idade;
}