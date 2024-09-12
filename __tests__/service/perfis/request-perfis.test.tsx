import { pegarPet } from "../../../src/service/perfis/request-perfis";
import { lerDocumento } from "../../../src/service/request-padrao-firebase";


jest.mock('../../../src/service/request-padrao-firebase');

describe('pegarPet', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpar os mocks após cada teste
    });

    it('deve retornar os pets corretamente quando encontrados', async () => {
        // Mock da função lerDocumento retornando um array de pets
        const mockPets = [
            { id: '1', nome: 'Rex', idade: 2 },
            { id: '2', nome: 'Buddy', idade: 3 }
        ];
        (lerDocumento as jest.Mock).mockResolvedValueOnce(mockPets);

        // Chama a função pegarPet
        const pets = await pegarPet('usuario123');

        // Verifica se os pets retornados estão corretos
        expect(pets).toEqual(mockPets);
    });

    it('deve retornar null quando não houver pets', async () => {
        // Mock da função lerDocumento retornando null
        (lerDocumento as jest.Mock).mockResolvedValueOnce(null);

        // Chama a função pegarPet
        const pets = await pegarPet('usuario123');

        // Verifica se o retorno foi null
        expect(pets).toBeNull();
    });

    it('deve retornar um array vazio quando a função lerDocumento retornar um array vazio', async () => {
        // Mock da função lerDocumento retornando um array vazio
        (lerDocumento as jest.Mock).mockResolvedValueOnce([]);

        // Chama a função pegarPet
        const pets = await pegarPet('usuario123');

        // Verifica se o retorno é um array vazio
        expect(pets).toEqual([]);
    });
});