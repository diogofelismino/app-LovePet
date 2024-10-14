import { Alert } from "react-native";
import { pegarVacinas, RegistrarVacina, validarCampos } from "../../../src/service/carteira-de-vacina/carteira-de-vacina";
import { criarDocumento, lerDocumento } from "../../../src/service/request-padrao-firebase";
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