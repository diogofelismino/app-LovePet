import { lerDocumento } from "../request-padrao-firebase";


export async function pegarCompromissos(usuarioId:any, petId:any) {
    var compromissos = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`)
    return compromissos;
  } 