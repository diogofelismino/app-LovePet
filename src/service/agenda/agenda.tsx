import { lerDocumento } from "../request-padrao-firebase";


export async function pegarCompromissos(usuarioId:any, petId:any, campoFiltro: any = null, valorFiltro: any = null, sinal:any = "==") {
    if(campoFiltro && valorFiltro){
      var compromissos = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`, null, campoFiltro, valorFiltro, sinal);
      return compromissos;
    }
    var compromissos = await lerDocumento(`Usuario/${usuarioId}/pets/${petId}/Compromisso`);
    return compromissos;
  } 