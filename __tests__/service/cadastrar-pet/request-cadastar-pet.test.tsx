import { Alert } from "react-native";
import { PetDto } from "../../../src/model/Dto/pets-dto/pet-dto";
import { calcularIdade, RealizarCadastroPet, validarCampos, verificarIdPet } from "../../../src/service/cadastrar-pet/request-cadastar-pet";
import { criarDocumento, lerDocumento } from "../../../src/service/request-padrao-firebase";



jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('../../../src/service/request-padrao-firebase');


describe('validação dos campos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar false e mostrar alerta quando campos obrigatórios estiverem vazios', () => {
    const dados = new PetDto(
      '',
      '',
      null,
      '',
      null,
      null
    );

    const resultado = validarCampos(dados);

    expect(resultado).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith("Aviso", "O campo Nome do pet é obrigatório. O campo Raça é obrigatório. Os campos mes e ano devem esta peenchidos. O campo Sexo é obrigatório.");
  });

  it('deve retornar true quando todos os campos estiverem preenchidos corretamente', () => {
    const dados = new PetDto(
      'Rex',
      'Labrador',
      5,
      'M',
      'sad',
      "05/2022"
    );

    const resultado = validarCampos(dados);

    expect(resultado).toBe(true);
    expect(Alert.alert).not.toHaveBeenCalled();
  });

});

describe('calcularIdade', () => {
  test('deve calcular a idade corretamente quando o mês e ano de nascimento são antes do mês atual', () => {
    // Supondo que o teste é executado em setembro de 2024
    const anoNascimento = 2015;
    const mesNascimento = 6; // Junho

    const resultado = calcularIdade(anoNascimento, mesNascimento);

    expect(resultado).toBe(9); // A idade deve ser 9 anos
  });

  test('deve calcular a idade corretamente quando o mês e ano de nascimento são no mesmo mês atual', () => {
    // Supondo que o teste é executado em setembro de 2024
    const anoNascimento = 2015;
    const mesNascimento = 9; // Setembro

    const resultado = calcularIdade(anoNascimento, mesNascimento);

    expect(resultado).toBe(9); // A idade deve ser 9 anos
  });

  test('deve calcular a idade corretamente quando o mês e ano de nascimento são após o mês atual', () => {
    // Supondo que o teste é executado em setembro de 2024
    const anoNascimento = 2015;
    const mesNascimento = 12; // Dezembro

    const resultado = calcularIdade(anoNascimento, mesNascimento);

    expect(resultado).toBe(8); // A idade deve ser 8 anos
  });

  test('deve retornar 0 quando o ano de nascimento é o ano atual e o mês é o mês atual', () => {
    const anoNascimento = 2024;
    const mesNascimento = 9; // Setembro

    const resultado = calcularIdade(anoNascimento, mesNascimento);

    expect(resultado).toBe(0); // A idade deve ser 0 anos
  });
});

describe('verificarIdPet', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  it('deve retornar o próximo ID de pet corretamente quando houver pets', async () => {
    // Mock da função lerDocumento com um array de pets
    (lerDocumento as jest.Mock).mockResolvedValueOnce([
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]);

    const novoIdPet = await verificarIdPet('usuario123');

    // Verifica se o próximo ID será 4
    expect(novoIdPet).toBe('4');
  });

  it('deve retornar "1" quando não houver pets', async () => {
    // Mock da função lerDocumento retornando um array vazio (sem pets)
    (lerDocumento as jest.Mock).mockResolvedValueOnce([]);

    const novoIdPet = await verificarIdPet('usuario123');

    // Verifica se o ID retornado será 1
    expect(novoIdPet).toBe('1');
  });

  it('deve retornar "1" quando lerDocumento retornar null', async () => {
    // Mock da função lerDocumento retornando null
    (lerDocumento as jest.Mock).mockResolvedValueOnce(null);

    const novoIdPet = await verificarIdPet('usuario123');

    // Verifica se o ID retornado será 1
    expect(novoIdPet).toBe('1');
  });

  it('deve retornar "1" quando lerDocumento não retornar um array', async () => {
    // Mock da função lerDocumento retornando um objeto inválido
    (lerDocumento as jest.Mock).mockResolvedValueOnce({});

    const novoIdPet = await verificarIdPet('usuario123');

    // Verifica se o ID retornado será 1
    expect(novoIdPet).toBe('1');
  });
});



describe('RealizarCadastroPet', () => {
  const mockNavigation = { navigate: jest.fn() };

  it('deve navegar para "Perfis" quando o cadastro for bem-sucedido', async () => {
    const mockDados = new PetDto(
      'Teste',
      'viralata',
      3,
      'M',
      '',
      '09/2022'
    );
    
    (criarDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

    await RealizarCadastroPet(mockDados, "usuario123",mockNavigation);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Perfis');
  });
});