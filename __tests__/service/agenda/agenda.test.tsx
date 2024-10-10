import { pegarCompromissos } from "../../../src/service/agenda/agenda";
import { lerDocumento } from "../../../src/service/request-padrao-firebase";



jest.mock('../../../src/service/request-padrao-firebase');


describe('pegarCompromissos', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('deve retornar os compromissos corretamente quando encontrados sem filtro', async () => {
        // Mock da função lerDocumento retornando um array de compromissos
        const mockCompromissos = [
            { id: '1', descricao: 'Vacina', data: '2024-09-30' },
            { id: '2', descricao: 'Consulta', data: '2024-10-01' }
        ];
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockCompromissos);

        // Chama a função pegarCompromissos sem filtro
        const compromissos = await pegarCompromissos('usuario123', 'pet456');

        // Verifica se os compromissos retornados estão corretos
        expect(compromissos).toEqual(mockCompromissos);
        expect(lerDocumento).toHaveBeenCalledWith('Usuario/usuario123/pets/pet456/Compromisso');
    });

    it('deve retornar os compromissos corretamente quando encontrados com filtro', async () => {
        // Mock da função lerDocumento retornando um array de compromissos filtrados
        const mockCompromissosFiltrados = [
            { id: '1', descricao: 'Vacina', data: '2024-09-30' }
        ];
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockCompromissosFiltrados);

        // Chama a função pegarCompromissos com filtro
        const campoFiltro = 'descricao';
        const valorFiltro = 'Vacina';
        const compromissos = await pegarCompromissos('usuario123', 'pet456', campoFiltro, valorFiltro);

        // Verifica se os compromissos retornados estão corretos
        expect(compromissos).toEqual(mockCompromissosFiltrados);
        expect(lerDocumento).toHaveBeenCalledWith(
            'Usuario/usuario123/pets/pet456/Compromisso',
            null,
            campoFiltro,
            valorFiltro,
            "=="
        );
    });

    it('deve retornar os compromissos corretamente quando encontrados', async () => {
        // Mock da função lerDocumento retornando um array de compromissos
        const mockCompromissos = [
            { id: '1', descricao: 'Vacina', data: '2024-09-30' },
            { id: '2', descricao: 'Consulta', data: '2024-10-01' }
        ];
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockCompromissos);

        // Chama a função pegarCompromissos
        const compromissos = await pegarCompromissos('usuario123', 'pet456');

        // Verifica se os compromissos retornados estão corretos
        expect(compromissos).toEqual(mockCompromissos);
    });

    it('deve retornar null quando não houver compromissos', async () => {
        // Mock da função lerDocumento retornando null
        (lerDocumento as jest.Mock).mockResolvedValueOnce(null);

        // Chama a função pegarCompromissos
        const compromissos = await pegarCompromissos('usuario123', 'pet456');

        // Verifica se o retorno foi null
        expect(compromissos).toBeNull();
    });

    it('deve retornar um array vazio quando a função lerDocumento retornar um array vazio', async () => {
        // Mock da função lerDocumento retornando um array vazio
        (lerDocumento as jest.Mock).mockResolvedValueOnce([]);

        // Chama a função pegarCompromissos
        const compromissos = await pegarCompromissos('usuario123', 'pet456');

        // Verifica se o retorno é um array vazio
        expect(compromissos).toEqual([]);
    });
});