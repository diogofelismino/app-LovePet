export class UsuarioDto {
    nome: string
    email: string
    cpf: string
    senha: string
    id:any

    constructor( nome: string, email: string, cpf: string, senha: string, id: any) {     
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.id = id;
    }
}