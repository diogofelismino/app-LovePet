export class UsuarioEditarDto {
    id:any
    nome: string
    email: string
    cpf: string
    senhaAtual: string
    novaSenha:string
    confirmarSenha: string

    senhaCripitografada: string = ""
    token: any = "";

    constructor( id:any, nome: string, email: string, cpf: string, senhaAtual: string, novaSenha:string, confirmarSenha: string) {     
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senhaAtual = senhaAtual;
        this.confirmarSenha = confirmarSenha;
        this.novaSenha = novaSenha
        this.id = id;
    }
}