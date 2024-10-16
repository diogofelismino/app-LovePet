import { Alert } from "react-native";
import { ExcluirVacina, pegarVacinas, PegarVacinasId, RegistrarVacina, validarCampos } from "../../../src/service/carteira-de-vacina/carteira-de-vacina";
import { criarDocumento, deletarDocumento, lerDocumento } from "../../../src/service/request-padrao-firebase";
import { mudarData, validateDateTime, verificarId } from "../../../src/utils/util";
import { VacinaDto } from "../../../src/model/Dto/vacina-dto/vacina-dto";
import { RegistrarCompromisso } from "../../../src/service/cadastrar-compromisso/request-cadastrar-compromisso";

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

jest.mock('../../../src/utils/util', () => ({
    validateDateTime: jest.fn(), // Mocka a função validateDateTime corretamente
    verificarId: jest.fn(),
    mudarData: jest.fn()
}));

jest.mock('../../../src/service/cadastrar-compromisso/request-cadastrar-compromisso', () => ({
    RegistrarCompromisso: jest.fn(), // Mocka a função validateDateTime corretamente

}));

jest.mock('../../../src/service/request-padrao-firebase');

describe('validarCampos', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar false e exibir alerta quando o nome da vacina estiver vazio', () => {
        const dados = new VacinaDto(
            null,
            '',
            '10/10/2024',
            '15/10/2025 10:00',
        );

        const resultado = validarCampos(dados);

        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'O campo Tipo da vacina é obrigatório. Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque uma data válida que seja maior que o dia de hoje.');
    });

    it('deve retornar false e exibir alerta quando a data de aplicação estiver vazia', () => {
        const dados = new VacinaDto(
            null,
            'Antirrábica',
            '',
            '15/10/2025 10:00',
        )


        const resultado = validarCampos(dados);

        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'O campo Data de aplicação é obrigatório. Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque uma data válida que seja maior que o dia de hoje.');
    });

    it('deve retornar false e exibir alerta quando a próxima dose tiver data e hora inválidas', () => {
        (validateDateTime as jest.Mock).mockReturnValueOnce(false);
        const dados = new VacinaDto(
            null,
            'Antirrábica',
            '10/10/2024',
            '33/pp/12313',
        );

        const resultado = validarCampos(dados);

        expect(resultado).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Aviso',
            'Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque uma data válida que seja maior que o dia de hoje.'
        );
    });

    it('deve retornar true quando todos os campos forem válidos', () => {
        (validateDateTime as jest.Mock).mockReturnValueOnce(true);
        const dados = new VacinaDto(
            null,
            'Antirrábica',
            '10/10/2024',
            '15/10/2025 10:00',
        )


        const resultado = validarCampos(dados);

        expect(resultado).toBe(true);
        expect(Alert.alert).not.toHaveBeenCalled();
    });
});

describe('pegarVacinas', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('deve retornar as vacinas corretamente quando encontradas', async () => {
        // Mock da função lerDocumento retornando um array de vacinas
        const mockVacinas = [
            { id: '1', nome: 'Antirrábica', data: '2024-09-30' },
            { id: '2', nome: 'V10', data: '2024-10-01' }
        ];
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockVacinas);

        // Chama a função pegarVacinas
        const vacinas = await pegarVacinas('usuario123', 'pet456');

        // Verifica se as vacinas retornadas estão corretas
        expect(vacinas).toEqual(mockVacinas);
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet456/Vacina');
    });

    it('deve retornar null quando não houver vacinas', async () => {
        // Mock da função lerDocumento retornando null
        (lerDocumento as jest.Mock).mockResolvedValueOnce(null);

        // Chama a função pegarVacinas
        const vacinas = await pegarVacinas('usuario123', 'pet456');

        // Verifica se o retorno foi null
        expect(vacinas).toBeNull();
    });

    it('deve retornar um array vazio quando a função lerDocumento retornar um array vazio', async () => {
        // Mock da função lerDocumento retornando um array vazio
        (lerDocumento as jest.Mock).mockResolvedValueOnce([]);

        // Chama a função pegarVacinas
        const vacinas = await pegarVacinas('usuario123', 'pet456');

        // Verifica se o retorno é um array vazio
        expect(vacinas).toEqual([]);
    });
});

describe('RegistrarVacina', () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockDados = new VacinaDto(
        null,
        'Antirrábica',
        '10/10/2024 10:00',
        ''
    );

    beforeEach(() => {
        jest.clearAllMocks(); // Limpa as chamadas anteriores
    });


    it('deve mostrar um alerta se ocorrer um erro ao criar documento', async () => {
        (criarDocumento as jest.Mock).mockResolvedValueOnce(null); // Simula falha na criação do documento
        (verificarId as jest.Mock).mockResolvedValueOnce('id-123'); // Simula a verificação de ID

        await RegistrarVacina(mockDados, 'usuario123', 'pet123', mockNavigation);

        expect(Alert.alert).toHaveBeenCalledWith("Erro", "Data de aplicação inválida."); // Verifica o alerta
    });
});

describe('PegarVacinasId', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('deve retornar a vacina correta', async () => {
        const mockVacina = {
            id: 'vacina123',
            nome: 'Vacina Anti-rábica',
            data: '10/10/2023',
        };

        // Mock da função lerDocumento para retornar a vacina simulada
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockVacina);

        const resultado = await PegarVacinasId('usuario123', 'pet123', 'vacina123');

        // Verifica se o documento retornado é o correto
        expect(resultado).toEqual(mockVacina);

        // Verifica se a função lerDocumento foi chamada com os parâmetros corretos
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Vacina', 'vacina123');
    });

    it('deve lidar corretamente com um erro ao buscar a vacina', async () => {
        // Mock da função lerDocumento para simular uma falha
        (lerDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar vacina'));

        await expect(PegarVacinasId('usuario123', 'pet123', 'vacina123'))
            .rejects
            .toThrow('Erro ao buscar vacina');

        // Verifica se a função lerDocumento foi chamada com os parâmetros corretos
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Vacina', 'vacina123');
    });
});

describe('ExcluirVacina', () => {
    const mockNavigation = { navigate: jest.fn() };
  
    beforeEach(() => {
      jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });
  
    it('deve excluir a vacina e navegar para "Vacinas" quando a exclusão for bem-sucedida', async () => {
      // Mock das funções para que resolvam com sucesso
      (deletarDocumento as jest.Mock).mockResolvedValueOnce({});
  
      await ExcluirVacina('usuario123', 'pet123', 'vacina123', mockNavigation);
  
      // Verifica se o documento foi excluído
      expect(deletarDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Vacina', 'vacina123');
  
      // Verifica se a mensagem de sucesso foi exibida
      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Vacina foi excluido com sucesso');
  
      // Verifica se a navegação foi chamada corretamente
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Vacinas');
    });
  
    it('deve exibir alerta de erro se a exclusão falhar', async () => {
      // Mock para simular uma falha na exclusão do documento
      (deletarDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao excluir documento'));
  
      await ExcluirVacina('usuario123', 'pet123', 'vacina123', mockNavigation);
  
      // Verifica se a função deletarDocumento foi chamada com os parâmetros corretos
      expect(deletarDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Vacina', 'vacina123');
  
      // Verifica se a mensagem de erro foi exibida
      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Ocorreu um erro ao tentar Excluir a Vacina, tente novemante mais tarde.');
  
      // Verifica que a navegação NÃO foi chamada
      expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });
  });