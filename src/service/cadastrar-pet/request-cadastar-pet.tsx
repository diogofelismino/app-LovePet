import { Alert } from "react-native";
import { PetDto } from "../../model/Dto/pets-dto/pet-dto";
import { criarDocumento, lerDocumento } from "../request-padrao-firebase";

export const validarCampos = (dados: PetDto) => {

    var retorno = "";

    if (!dados.nome_pet) {
        retorno += "O campo Nome do pet é obrigatório. ";
    }
    if (!dados.raca) {
        retorno += "O campo Raça é obrigatório. ";
    }
    if (!dados.idade && !dados.data_pet) {
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

export function calcularIdade(ano: number, mes: number) {
    const dataAtula = new Date();
    const anoAtual = dataAtula.getFullYear();
    const mesAtual = dataAtula.getMonth() + 1;


    let idade = anoAtual - ano;

    if (mesAtual < mes || (mesAtual === mes && dataAtula.getDate() < 1)) {
        idade--;
    }

    return idade;
}

export async function verificarIdPet(usuarioId: any) {
    var pets = await lerDocumento(`Usuario/${usuarioId}/pets`)
    if (pets?.length > 0  && Array.isArray(pets)){
        const maxId = Math.max(...pets.map((item: any) => Number(item.id)));
        // Retornar o próximo ID como string
        return (maxId + 1).toString();

    }
    else
        return '1'
}


export async function RealizarCadastroPet(dados: PetDto, usuarioId: any, navigation: any) {
    if (!validarCampos(dados)) {
        return;
    }

    var id = await verificarIdPet(usuarioId);
    dados.id = id;

    const elemento = await criarDocumento(`Usuario/${usuarioId}/pets`, dados, dados.id);

    if (elemento)
        navigation.navigate("Perfis");
    else
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Cadastrar o Pet, tente novemante mais tarde.")
}