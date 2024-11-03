import { Alert } from "react-native";
import { AtualizarSenha, EditarDadoUsuario, validarCampos } from "../../../src/service/editar-usuario/editar-usuario";
import { validarCPF } from "../../../src/utils/util";
import { UsuarioEditarDto } from "../../../src/model/Dto/editar-usuario-dto/editar-usuario-dto";
import { auth } from "../../../src/config/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { updateDocumento } from "../../../src/service/request-padrao-firebase";

jest.mock("../../../src/config/firebase", () => ({
    auth: {
        currentUser: {
            email: 'usuario@exemplo.com',
        },
    },
}));

jest.mock('firebase/auth', () => ({
    EmailAuthProvider: {
        credential: jest.fn(),
    },
    reauthenticateWithCredential: jest.fn(),
    updatePassword: jest.fn(),
}));

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

jest.mock('../../../src/utils/util', () => ({
    validarCPF: jest.fn((cpf) => true), // Mock para sempre validar o CPF como correto
}));

jest.mock('../../../src/service/request-padrao-firebase');

describe('validarCampos', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    test('deve retornar false e exibir alerta se o nome estiver ausente', () => {
        const dados = new UsuarioEditarDto('123', '', 'usuario@exemplo.com', '12345678909', 'senhaAtual123', 'novaSenha123', 'novaSenha123');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Nome é obrigatório.");
    });

    test('deve retornar false e exibir alerta se o CPF for inválido', () => {
        (validarCPF as jest.Mock).mockReturnValueOnce(false); // Mock para CPF inválido
        const dados = new UsuarioEditarDto('123', 'Nome do Usuário', 'usuario@exemplo.com', '00000000000', 'senhaAtual123', 'novaSenha123', 'novaSenha123');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "Insira um CPF válido.");
    });

    test('deve retornar false e exibir alerta se a senha atual estiver ausente quando nova senha ou confirmação de senha estão preenchidas', () => {
        const dados = new UsuarioEditarDto('123', 'Nome do Usuário', 'usuario@exemplo.com', '12345678909', '', 'novaSenha123', 'novaSenha123');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Senha Atual é obrigatório.");
    });

    test('deve retornar false e exibir alerta se a nova senha e a confirmação de senha não coincidirem', () => {
        const dados = new UsuarioEditarDto('123', 'Nome do Usuário', 'usuario@exemplo.com', '12345678909', 'senhaAtual123', 'novaSenha123', 'senhaDiferente');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "A Nova Senha não é igual ao Confirmar Senha.");
    });

    test('deve retornar false e exibir alerta se nova senha estiver ausente quando senha atual ou confirmação de senha estão preenchidas', () => {
        const dados = new UsuarioEditarDto('123', 'Nome do Usuário', 'usuario@exemplo.com', '12345678909', 'senhaAtual123', '', 'confirmarSenha123');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O Campo Nova Senha é obrigatório");
    });

    test('deve retornar true se todos os campos estiverem corretos', () => {
        const dados = new UsuarioEditarDto('123', 'Nome do Usuário', 'usuario@exemplo.com', '12345678909', 'senhaAtual123', 'novaSenha123', 'novaSenha123');
        const result = validarCampos(dados);
        expect(result).toBe(true);
        expect(Alert.alert).not.toHaveBeenCalled();
    });
});

describe('AtualizarSenha', () => {
    const senhaAtual = 'senhaAtual123';
    const novaSenha = 'novaSenha123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('deve retornar mensagem de erro se não houver usuário autenticado', async () => {
        (auth.currentUser as any) = null;
        
        const result = await AtualizarSenha(senhaAtual, novaSenha);
        expect(result).toBe("Nenhum usuário autenticado.");
    });

    test('deve retornar mensagem de erro se a senha atual estiver incorreta', async () => {
        const mockUser = { email: 'usuario@exemplo.com' };
        (auth.currentUser as any) = mockUser;
        (reauthenticateWithCredential as jest.Mock).mockRejectedValueOnce({ code: 'auth/wrong-password' });

        const result = await AtualizarSenha(senhaAtual, novaSenha);
        expect(result).toBe("A senha atual está incorreta.");
    });

    test('deve retornar mensagem de erro se a nova senha for muito fraca', async () => {
        const mockUser = { email: 'usuario@exemplo.com' };
        (auth.currentUser as any) = mockUser;
        (reauthenticateWithCredential as jest.Mock).mockResolvedValueOnce(true);
        (updatePassword as jest.Mock).mockRejectedValueOnce({ code: 'auth/weak-password' });

        const result = await AtualizarSenha(senhaAtual, novaSenha);
        expect(result).toBe("A nova senha é muito fraca. Escolha uma senha mais forte.");
    });


});


describe('EditarDadoUsuario', () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockSignIn = jest.fn();
    const mockUsuario = new UsuarioEditarDto(1, "Nome", "usuario@exemplo.com", "12345678900", "", "", "");
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('deve atualizar o usuário com sucesso', async () => {
        (updateDocumento as jest.Mock).mockResolvedValue(undefined); // Simula que a atualização no documento foi bem-sucedida

        await EditarDadoUsuario(mockUsuario, mockNavigation, mockSignIn);


        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "Usuario atualizado com sucesso");
        expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
    });

    test('deve exibir alerta em caso de erro', async () => {
        (updateDocumento as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar')); // Simula erro na atualização do documento

        await EditarDadoUsuario(mockUsuario, mockNavigation, mockSignIn);

        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "Ocorreu um erro ao tentar Editar o Usuario, tente novemante mais tarde.");
    });
});