import { Alert } from "react-native";
import { VacinaDto } from "../../model/Dto/vacina-dto/vacina-dto";
import { mudarData, validateDateTime, verificarId } from "../../utils/util";
import { criarDocumento, deletarDocumento, lerDocumento, updateDocumento } from "../request-padrao-firebase";
import { RegistrarCompromisso } from "../cadastrar-compromisso/request-cadastrar-compromisso";
import { CadastrarCompromissoDto } from "../../model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto";

export function validarCampos(dados: VacinaDto) {

    var retorno = "";

    if (!dados.nome_vacina || dados.nome_vacina == '') {
        retorno += "O campo Tipo da vacina é obrigatório. ";
    }
    if (!dados.data_aplicacao || dados.data_aplicacao == '') {
        retorno += "O campo Data de aplicação é obrigatório. ";
    }
    if (!validateDateTime(dados.proxima_dose) && dados.proxima_dose != '') {
        retorno += 'Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque uma data válida que seja maior que o dia de hoje.';
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
}

export async function RegistrarVacina(dados: VacinaDto, usuarioId: any, petId: any, navigation: any) {
    if (!validarCampos(dados)) {
        return;
    }

    var data_proxima_dose_compromisso = dados.proxima_dose;


    var data = dados.data_aplicacao;
    data = mudarData(data, (data!.toString().length > 10));

    if (!data || isNaN(new Date(data).getTime())) {
        Alert.alert("Erro", "Data de aplicação inválida.");
        return;
    }

    var proxima_dose = dados.proxima_dose;

    dados.id = await verificarId(`Usuario/${usuarioId}/pets/${petId}/Vacina`);
    dados.data_aplicacao = new Date(data).toISOString();

    if (dados.proxima_dose != "") {
        proxima_dose = mudarData(proxima_dose)
        dados.proxima_dose = new Date(proxima_dose).toISOString();
    }

    const elemento = await criarDocumento(`Usuario/${usuarioId}/pets/${petId}/Vacina`, dados, dados.id);

    if (elemento) {
        if (dados.proxima_dose != "") {

            const compromisso: CadastrarCompromissoDto = {
                id: null,
                titulo: `Vacinação de ${dados.nome_vacina}`,
                descricao: "",
                data_hora: data_proxima_dose_compromisso
            }

            var retorno = await RegistrarCompromisso(compromisso, usuarioId, petId, navigation, true, true);
            if (retorno)
                navigation.navigate("Vacinas");
        }
        else
            navigation.navigate("Vacinas");
    }
    else
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Cadastrar a Vacina, tente novemante mais tarde.")
}



export async function pegarVacinas(usuarioId: any, petId: any) {

    var vacina = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Vacina`);
    return vacina;
}

export async function PegarVacinasId(usuarioId: any, petId: any, vacinaId: any) {
    var vacina = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Vacina`, vacinaId)
    return vacina;
}



export async function ExcluirVacina(usuarioId: any, petId: any, vacinaId: any, navigation: any) {
    try {

        await deletarDocumento(`Usuario/${usuarioId}/pets/${petId}/Vacina`, vacinaId);
        Alert.alert("Aviso", "Vacina foi excluido com sucesso");
        navigation.navigate("Vacinas");
    } catch (error) {
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Excluir a Vacina, tente novemante mais tarde.");
    }
}

// export async function EditarVacina(dados: VacinaDto, usuarioId: any, petId: any, navigation: any, geraLembre: boolean) {
//     try {
//         if (!validarCampos(dados)) {
//             return;
//         }
//         var data_proxima_dose_compromisso = dados.proxima_dose;

//         var data = dados.data_aplicacao;
//         data = mudarData(data, (data!.toString().length > 10));

//         if (!data || isNaN(new Date(data).getTime())) {
//             Alert.alert("Erro", "Data de aplicação inválida.");
//             return;
//         }

//         var proxima_dose = dados.proxima_dose;

//         dados.id = await verificarId(`Usuario/${usuarioId}/pets/${petId}/Vacina`);
//         dados.data_aplicacao = new Date(data).toISOString();

//         if (dados.proxima_dose != "") {
//             proxima_dose = mudarData(proxima_dose)
//             dados.proxima_dose = new Date(proxima_dose).toISOString();
//         }
//         await updateDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, dados.id, dados);

//         if (dados.proxima_dose != "") {

//             const compromisso: CadastrarCompromissoDto = {
//                 id: null,
//                 titulo: `Vacinação de ${dados.nome_vacina}`,
//                 descricao: "",
//                 data_hora: data_proxima_dose_compromisso
//             }

//             var retorno = await RegistrarCompromisso(compromisso, usuarioId, petId, navigation, true, true);
//             //colocar um alerta para excluir o compromisso já cadastrado.
//             if (retorno)
//                 navigation.navigate("Vacinas");
//         }
//         else
//             navigation.navigate("Vacinas");

//     }
//     catch (error) {
//         Alert.alert("Aviso", "Ocorreu um erro ao tentar Editar o Vacina, tente novemante mais tarde.");
//     }
// }
