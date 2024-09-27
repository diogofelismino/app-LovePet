import { Alert } from "react-native";
import { AgendarNotificacao, mudarData, RegistrarCompromisso, validarCampos } from "../../../src/service/cadastrar-compromisso/request-cadastrar-compromisso";
import { CadastrarCompromissoDto } from "../../../src/model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto";
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import { criarDocumento } from "../../../src/service/request-padrao-firebase";




jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

jest.mock('../../../src/service/request-padrao-firebase');



describe('validarCampos', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    test('deve retornar false e exibir alerta se o título estiver ausente', () => {
        const dados = new CadastrarCompromissoDto(null, '', '', '01/01/2025 10:00');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Titulo é obrigatório. ");
    });

    test('deve retornar false e exibir alerta se a data e hora estiverem ausentes', () => {
        const dados = new CadastrarCompromissoDto(null, 'Título', '', '');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Data é obrigatório. ");
    });

    test('deve retornar false e exibir alerta se a data e hora forem inválidas', () => {
        const dados = new CadastrarCompromissoDto(null, 'Título', '', '01/01/2024 10:00');
        const result = validarCampos(dados);
        expect(result).toBe(false);
        expect(Alert.alert).toHaveBeenCalledWith(
            "Aviso",
            'Data e hora inválidas. Use o formato DD/MM/YYYY HH:mm e coloque um data valida que seja maior que o dia de hoje.'
        );
    });

    test('deve retornar true se todos os campos estiverem corretos', () => {
        const dados = new CadastrarCompromissoDto(null, 'Título', '', '01/01/2025 10:00');
        const result = validarCampos(dados);
        expect(result).toBe(true);
        expect(Alert.alert).not.toHaveBeenCalled();
    });
});

describe('mudarData', () => {
    test('deve converter a string de data e hora no formato correto', () => {
        const input = '15/09/2024 14:30';
        const result = mudarData(input);

        // Cria a data esperada
        const expectedDate = new Date(2024, 8, 15, 14, 30); // Meses são indexados de 0
        const expectedDateString = expectedDate.toString();

        expect(result).toBe(expectedDateString);
    });

    test('deve lidar com datas em anos diferentes', () => {
        const input = '01/01/2000 00:00';
        const result = mudarData(input);

        const expectedDate = new Date(2000, 0, 1, 0, 0);
        const expectedDateString = expectedDate.toString();

        expect(result).toBe(expectedDateString);
    });

    test('deve lidar com datas em meses diferentes', () => {
        const input = '01/12/2024 23:59';
        const result = mudarData(input);

        const expectedDate = new Date(2024, 11, 1, 23, 59); // Dezembro é o mês 11
        const expectedDateString = expectedDate.toString();

        expect(result).toBe(expectedDateString);
    });

    test('deve lidar com datas no início e fim do dia', () => {
        const input1 = '01/01/2024 00:00';
        const result1 = mudarData(input1);
        const expectedDate1 = new Date(2024, 0, 1, 0, 0);
        const expectedDateString1 = expectedDate1.toString();
        expect(result1).toBe(expectedDateString1);

        const input2 = '31/12/2024 23:59';
        const result2 = mudarData(input2);
        const expectedDate2 = new Date(2024, 11, 31, 23, 59);
        const expectedDateString2 = expectedDate2.toString();
        expect(result2).toBe(expectedDateString2);
    });
});

describe('AgendarNotificacao', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    test('deve solicitar permissão, criar um canal e agendar uma notificação', async () => {
        const data = 'Sun Sep 15 2024 14:30:00 GMT-0400'; // GMT-0300
        const titulo = 'Reunião';

        // Call the function to schedule the notification
        await AgendarNotificacao(data, titulo);

        // Define expected values
        const expectedBody = `Horario agendado: 14:30`;
        const expectedTimestamp = new Date(data).getTime(); // O timestamp da data fornecida

        // Check if requestPermission and createChannel were called correctly
        expect(notifee.requestPermission).toHaveBeenCalled();
        expect(notifee.createChannel).toHaveBeenCalledWith({
            id: 'default',
            name: 'Compromissos',
            importance: 4, // Use o valor apropriado para AndroidImportance.HIGH
        });

        // Verify if createTriggerNotification was called with the correct parameters
        expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
            {
                title: titulo,
                body: expectedBody,
                android: { channelId: 'mockChannelId' },
            },
            {
                type: 'timestamp',
                timestamp: expectedTimestamp,
            }
        );
    });
});


describe('RealizarCadastroPet', () => {
    const mockNavigation = { navigate: jest.fn() };

    it('deve navegar para "Agenda" quando o cadastro for bem-sucedido com notificação agendada', async () => {


        const mockDados = new CadastrarCompromissoDto(
            null,
            'Título',
            '',
            '01/01/2025 10:00'
        );

        (criarDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

        await RegistrarCompromisso(mockDados, "usuario123", "pet123", mockNavigation, true);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Agenda');
    });

    it('deve navegar para "Agenda" quando o cadastro for bem-sucedido sem notificação agendada', async () => {


        const mockDados = new CadastrarCompromissoDto(
            null,
            'Título',
            '',
            '01/01/2025 10:00'
        );

        (criarDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

        await RegistrarCompromisso(mockDados, "usuario123", "pet123", mockNavigation, false);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Agenda');
    });
});