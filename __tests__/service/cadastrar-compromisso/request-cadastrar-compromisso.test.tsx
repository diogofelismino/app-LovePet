import { Alert } from "react-native";
import { AgendarNotificacao, cancelarNotificacao, EditarCompromisso, ExcluirCompromisso, PegarCompromisso, RegistrarCompromisso, validarCampos } from "../../../src/service/cadastrar-compromisso/request-cadastrar-compromisso";
import { CadastrarCompromissoDto } from "../../../src/model/Dto/cadastrar-compomisso-dto/cadastrar-compromisso-dto";
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import { criarDocumento, deletarDocumento, lerDocumento, updateDocumento } from "../../../src/service/request-padrao-firebase";
import { mudarData } from "../../../src/utils/util";




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
        const expectedBody = `Horario agendado: 15:30`;
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
            expect.objectContaining({

                title: titulo,
                body: expectedBody,
                android: { channelId: 'mockChannelId' },

            }),
            {
                type: 'timestamp',
                timestamp: expectedTimestamp,
            }
        );
    });
});


describe('RegistrarCompromisso', () => {
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


describe('EditarCompromisso', () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockDados = new CadastrarCompromissoDto(
        '123',
        'Título do Compromisso',
        '',
        '01/01/2025 10:00'
    );

    it('deve navegar para "Agenda" quando a edição for bem-sucedida sem agendar compromissoo', async () => {
        (updateDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

        await EditarCompromisso(mockDados, "usuario123", "pet123", mockNavigation, false);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Agenda');


        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Compromisso atualizado com sucesso');
    });

    it('deve navegar para "Agenda" quando a edição for bem-sucedida agendando compromissoo', async () => {

        (updateDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

        await EditarCompromisso(mockDados, "usuario123", "pet123", mockNavigation, true);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Agenda');


        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Compromisso atualizado com sucesso');
    });
});

describe('PegarCompromisso', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('deve retornar o compromisso correto', async () => {
        const mockCompromisso = {
            id: '123',
            titulo: 'Vacinação',
            data_hora: '01/01/2025 10:00',
        };

        // Mock da função lerDocumento para retornar o compromisso simulado
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockCompromisso);

        const resultado = await PegarCompromisso('usuario123', 'pet123', 'compromisso123');

        // Verifica se o documento retornado é o correto
        expect(resultado).toEqual(mockCompromisso);

        // Verifica se a função lerDocumento foi chamada com os parâmetros corretos
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Compromisso', 'compromisso123');
    });

    it('deve lidar corretamente com um erro ao buscar o compromisso', async () => {
        // Mock da função lerDocumento para simular uma falha
        (lerDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao buscar compromisso'));

        await expect(PegarCompromisso('usuario123', 'pet123', 'compromisso123'))
            .rejects
            .toThrow('Erro ao buscar compromisso');

        // Verifica se a função lerDocumento foi chamada com os parâmetros corretos
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Compromisso', 'compromisso123');
    });
});

describe('ExcluirCompromisso', () => {
    const mockNavigation = { navigate: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    it('deve excluir o compromisso e navegar para "Agenda" quando a exclusão for bem-sucedida', async () => {
        // Mock das funções para que resolvam com sucesso
        (deletarDocumento as jest.Mock).mockResolvedValueOnce({});

        await ExcluirCompromisso('usuario123', 'pet123', 'compromisso123', mockNavigation);

        // Verifica se o documento foi excluído
        expect(deletarDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Compromisso', 'compromisso123');

        // Verifica se a mensagem de sucesso foi exibida
        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Compromisso foi excluido com sucesso');

        // Verifica se a navegação foi chamada corretamente
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Agenda');
    });

    it('deve exibir alerta de erro se a exclusão falhar', async () => {
        // Mock para simular uma falha na exclusão do documento
        (deletarDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao excluir documento'));

        await ExcluirCompromisso('usuario123', 'pet123', 'compromisso123', mockNavigation);

        // Verifica se a função deletarDocumento foi chamada com os parâmetros corretos
        expect(deletarDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet123/Compromisso', 'compromisso123');

        // Verifica se a mensagem de erro foi exibida
        expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Ocorreu um erro ao tentar Excluir o Compromisso, tente novemante mais tarde.');

        // Verifica que a navegação NÃO foi chamada
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });
});

describe('cancelarNotificacao', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    it('deve cancelar a notificação com sucesso', async () => {
        const mockIdNotificacao = 'notificacao123';

        // Mockando a função cancelNotification
        notifee.cancelNotification = jest.fn().mockResolvedValueOnce(undefined);

        // Chamando a função a ser testada
        await cancelarNotificacao(mockIdNotificacao);

        // Verificando se cancelNotification foi chamada com o ID correto
        expect(notifee.cancelNotification).toHaveBeenCalledWith(mockIdNotificacao);

    });

    it('deve tratar erro ao cancelar a notificação', async () => {
        const mockIdNotificacao = 'notificacao123';
        const mockError = new Error('Erro ao cancelar');

        // Mockando a função cancelNotification para rejeitar a promessa
        notifee.cancelNotification = jest.fn().mockRejectedValueOnce(mockError);

        // Spy para monitorar console.error
        console.error = jest.fn();

        // Chamando a função a ser testada
        await cancelarNotificacao(mockIdNotificacao);

        // Verificando se cancelNotification foi chamada com o ID correto
        expect(notifee.cancelNotification).toHaveBeenCalledWith(mockIdNotificacao);

        // Verificando se a mensagem de erro foi registrada no console
        expect(console.error).toHaveBeenCalledWith('Erro ao cancelar a notificação:', mockError);
    });
});