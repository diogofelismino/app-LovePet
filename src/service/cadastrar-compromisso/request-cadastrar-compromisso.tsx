import { Alert } from "react-native";
import { CadastrarCompromissoDto } from "../../model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto";
import { mudarData, validateDateTime, verificarId } from "../../utils/util";
import { criarDocumento, deletarDocumento, lerDocumento, updateDocumento } from "../request-padrao-firebase";
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';


export function validarCampos(dados: CadastrarCompromissoDto) {

    var retorno = "";

    if (!dados.titulo || dados.titulo == '') {
        retorno += "O campo Titulo é obrigatório. ";
    }
    if (!dados.data_hora || dados.data_hora == '') {
        retorno += "O campo Data é obrigatório. ";
    }
    if (!validateDateTime(dados.data_hora) && dados.data_hora != '') {
        retorno += 'Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque um data valida que seja maior que o dia de hoje.';
    }

    if (retorno != "") {
        Alert.alert("Aviso", retorno)
        return false;
    }
    return true;
}


export async function AgendarNotificacao(data: any, titulo: string, idCompromisso: any = "default") {

    const date = new Date(data);

    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
        id: idCompromisso,
        name: 'Compromissos',
        importance: AndroidImportance.HIGH,
    });

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime()

    }

    await notifee.createTriggerNotification({
        id: idCompromisso,
        title: `${titulo}`,
        body: `Horario agendado: ${date.getHours()}:${date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()}`,
        android: { channelId },
    }, trigger);

}


export async function RegistrarCompromisso(dados: CadastrarCompromissoDto, usuarioId: any, petId: any, navigation: any, geraLembre: boolean, vacina: boolean = false) {
    if (!validarCampos(dados)) {
        return;
    }
    var data = dados.data_hora;
    data = mudarData(data);

    dados.id = await verificarId(`Usuario/${usuarioId}/pets/${petId}/Compromisso`);
    dados.data_hora = new Date(data).toISOString();

    if (geraLembre)
        await AgendarNotificacao(data, dados.titulo, dados.id);

    const elemento = await criarDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, dados, dados.id);

    if (elemento && !vacina) {
        navigation.navigate("Agenda");
    }
    else if(elemento && vacina){
        return true;
    }
    else
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Cadastrar o Compromisso, tente novemante mais tarde.")

}

export async function PegarCompromisso(usuarioId: any, petId: any, compomissoId: any) {
    var compromissos = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, compomissoId)
    return compromissos;
}

export async function EditarCompromisso(dados: CadastrarCompromissoDto, usuarioId: any, petId: any, navigation: any, geraLembre: boolean) {
    try {

        if (!validarCampos(dados)) {
            return;
        }

        var data = dados.data_hora;
        data = mudarData(data);
        dados.data_hora = new Date(data).toISOString();

        await updateDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, dados.id, dados);

        if (geraLembre)
            await AgendarNotificacao(data, dados.titulo, dados.id);

        Alert.alert("Aviso", "Compromisso atualizado com sucesso");
        navigation.navigate("Agenda");
    }
    catch (error) {
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Editar o Compromisso, tente novemante mais tarde.");
    }
}

export async function ExcluirCompromisso(usuarioId: any, petId: any, compromissoId: any, navigation: any) {
    try {

        await deletarDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, compromissoId);
        await cancelarNotificacao(compromissoId);

        Alert.alert("Aviso", "Compromisso foi excluido com sucesso");
        navigation.navigate("Agenda");
    } catch (error) {
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Excluir o Compromisso, tente novemante mais tarde.");
    }
}

export async function cancelarNotificacao(idNotificacao: any) {
    try {
        await notifee.cancelNotification(idNotificacao);
    } catch (error) {
        console.error('Erro ao cancelar a notificação:', error);
    }
}