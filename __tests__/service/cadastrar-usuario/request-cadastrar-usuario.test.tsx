import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UsuarioCadastroDto } from '../../../src/model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto';
import { RealizarCadastro, validarCampos } from '../../../src/service/cadastrar-usuario/request-cadastrar-usuario'; // Substitua pelo caminho correto
import { Alert } from 'react-native';
import { auth } from '../../../src/config/firebase';

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));


jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
}));

const mockNavigation = {
    navigate: jest.fn(),
};

describe('Teste da função validarCampos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar falso e exibir alerta quando o nome estiver vazio', () => {
        const dados = { nome: '', email: 'teste@teste.com', cpf: '12345678909', senha: 'senha123', confirmarSenha: 'senha123' };
        const resultado = validarCampos(dados);
        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Nome é obrigatório.");
    });

    it('deve retornar falso e exibir alerta quando o email for inválido', () => {
        const dados = { nome: 'Teste', email: 'email_invalido', cpf: '12345678909', senha: 'senha123', confirmarSenha: 'senha123' };
        const resultado = validarCampos(dados);
        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "Insira um email válido.");
    });

    it('deve retornar falso e exibir alerta quando o CPF for inválido', () => {
        const dados = { nome: 'Teste', email: 'teste@teste.com', cpf: 'cpf_invalido', senha: 'senha123', confirmarSenha: 'senha123' };
        const resultado = validarCampos(dados);
        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "Insira um CPF válido.");
    });

    it('deve retornar falso e exibir alerta quando as senhas não coincidirem', () => {
        const dados = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678909', senha: 'senha123', confirmarSenha: 'senha_diferente' };
        const resultado = validarCampos(dados);
        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "As senhas não coincidem.");
    });

    it('deve retornar verdadeiro quando todos os campos forem válidos', () => {
        const dados = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678909', senha: 'senha123', confirmarSenha: 'senha123' };
        const resultado = validarCampos(dados);
        expect(resultado).toBe(true);
        expect(Alert.alert).not.toHaveBeenCalled();
    });
});



describe('RealizarCadastro', () => {
    it('deve navegar para "Login" quando o cadastro for bem-sucedido', async () => {
        const mockDados = new UsuarioCadastroDto(
            'Teste',
            'teste@example.com',
            '05403530193',
            'senha123',
            'senha123'
        );
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: { uid: 'mockedUID' } });

        await RealizarCadastro(mockDados, mockNavigation);

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockDados.email, mockDados.senha);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
});