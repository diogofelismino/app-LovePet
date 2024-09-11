import { lerDocumento } from "../request-padrao-firebase";

async function pegarPet(id:any) {
    var pets = await lerDocumento(`Usuario/${id}/pets`)
    return pets;
  } 