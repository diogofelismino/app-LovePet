export class UsuarioEditarDto {
    nome: string
    email: string
    cpf: string
    senhaAtual: string
    novaSenha:string
    confirmarSenha: string

    constructor( nome: string, email: string, cpf: string, senhaAtual: string, novaSenha:string, confirmarSenha: string) {     
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senhaAtual = senhaAtual;
        this.confirmarSenha = confirmarSenha;
        this.novaSenha = novaSenha
    }
}