import { Alert } from "react-native";
import { CadastrarCompromissoDto } from "../../model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto";
import { validateDateTime, verificarId } from "../../utils/util";
import { criarDocumento } from "../request-padrao-firebase";
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

export function mudarData(date: any) {
    const [datePart, timePart] = date.split(' ');
    const [day, month, year] = datePart.split("/");
    const [hours, minutes] = timePart.split(':');
    const dateObject = new Date(year, month - 1, day, hours, minutes);

    return dateObject.toString();
}

export async function AgendarNotificacao(data: any, titulo: string) {

    const date = new Date(data);

    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Compromissos',
        importance: AndroidImportance.HIGH,
    });

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime()

    }

    await notifee.createTriggerNotification({
        title: `${titulo}`,
        body: `Horario agendado: ${date.getHours()}:${date.getMinutes()}`,
        android: { channelId },
    }, trigger);
}


export async function RegistrarCompromisso(dados: CadastrarCompromissoDto, usuarioId: any, petId: any, navigation: any, geraLembre: boolean) {
    if (!validarCampos(dados)) {
        return;
    }

    dados.data_hora = mudarData(dados.data_hora);

    if (geraLembre)
        await AgendarNotificacao(dados.data_hora, dados.titulo);

    dados.id = await verificarId(`Usuario/${usuarioId}/pets/${petId}/Compromisso`);

    const elemento = await criarDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, dados, dados.id);

    if (elemento) {
        navigation.navigate("Agenda");
    }
    else
        Alert.alert("Aviso", "Ocorreu um erro ao tentar Cadastrar o Compromisso, tente novemante mais tarde.")

}