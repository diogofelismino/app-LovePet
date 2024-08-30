import { Alert } from 'react-native';
import { validarCampos } from '../CadastrarUsuario';

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

describe('validarCampos', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpar os mocks antes de cada teste
    });

    it('deve retornar false se o campo Nome estiver vazio', () => {
        // Configurando os valores dos estados para simular a chamada da função
        const result = validarCampos.call({
            state: {
                nome: '',
                email: 'teste@example.com',
                cpf: '123.456.789-09',
                senha: 'senha123',
                confirmarSenha: 'senha123'
            }
        });
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Erro", "O campo Nome é obrigatório.");
    });

    it('deve retornar false se o email for inválido', () => {
        const result = validarCampos.call({
            state: {
                nome: 'Teste',
                email: 'invalido',
                cpf: '123.456.789-09',
                senha: 'senha123',
                confirmarSenha: 'senha123'
            }
        });
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Erro", "Insira um email válido.");
    });

    // Adicione mais testes para os outros cenários
    // ...
});
