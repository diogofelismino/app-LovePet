import { UsuarioDto } from "./usuario-dto";

export class UsuarioLogadoDto {
    usuario: UsuarioDto = new UsuarioDto("", "", "", "", "")
    token:any
}