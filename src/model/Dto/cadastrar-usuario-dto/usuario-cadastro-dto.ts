export class UsuarioCadastroDto {
    nome: string
    email: string
    cpf: string
    senha: string
    confirmarSenha: string

    constructor( nome: string, email: string, cpf: string, senha: string, confirmarSenha: string) {     
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha;
    }
}