import { Alert } from "react-native";
import { PetDto } from "../../../src/model/Dto/pets-dto/pet-dto";
import { calcularIdade, RealizarCadastroPet, RealizarEdicaoPet, RealizarExclusaoPet, validarCampos, verificarIdPet } from "../../../src/service/cadastrar-pet/request-cadastar-pet";
import { criarDocumento, deletarDocumento, lerDocumento, updateDocumento } from "../../../src/service/request-padrao-firebase";



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

describe('RealizarEdicaoPet', () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockDados = new PetDto(
    'Nome do Pet',
    'Raça do Pet',
    3,
    'M',
    '123',
    '09/2022'
  );
  const mockUsuarioId = 'usuario123';
  const mockDesselecionarPet = jest.fn();
  const mockSelecionarPet = jest.fn();

  beforeEach(() => {
      jest.clearAllMocks();
  });

  it('deve navegar para "Home" quando a edição for bem-sucedida', async () => {
      (updateDocumento as jest.Mock).mockResolvedValueOnce({ id: '123' });

      await RealizarEdicaoPet(mockDados, mockUsuarioId, mockNavigation, mockDesselecionarPet, mockSelecionarPet);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Pet atualizado com sucesso');
  });

  it('deve exibir mensagem de erro quando a edição falhar', async () => {
      (updateDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar'));

      await RealizarEdicaoPet(mockDados, mockUsuarioId, mockNavigation, mockDesselecionarPet, mockSelecionarPet);

      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Ocorreu um erro ao tentar Editar o Pet, tente novemante mais tarde.');
  });
});

describe('RealizarExclusaoPet', () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockUsuarioId = 'usuario123';
  const mockPetId = 'pet123';
  const mockDesselecionarPet = jest.fn();

  beforeEach(() => {
      jest.clearAllMocks();
  });

  it('deve excluir o pet e navegar para "Perfis" quando a exclusão for bem-sucedida', async () => {
      // Mock da função deletarDocumento para simular uma exclusão bem-sucedida
      (deletarDocumento as jest.Mock).mockResolvedValueOnce({});

      await RealizarExclusaoPet(mockUsuarioId, mockPetId, mockNavigation, mockDesselecionarPet);

      // Verifica se o documento foi excluído com os parâmetros corretos
      expect(deletarDocumento).toHaveBeenCalledWith(`Usuario/${mockUsuarioId}/pets/`, mockPetId);

      // Verifica se a função desselecionarPet foi chamada
      expect(mockDesselecionarPet).toHaveBeenCalled();

      // Verifica se a mensagem de sucesso foi exibida
      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Pet foi excluido com sucesso');

      // Verifica se a navegação foi chamada corretamente
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Perfis');
  });

  it('deve exibir alerta de erro se a exclusão falhar', async () => {
      // Mock para simular uma falha na exclusão do documento
      (deletarDocumento as jest.Mock).mockRejectedValueOnce(new Error('Erro ao excluir documento'));

      await RealizarExclusaoPet(mockUsuarioId, mockPetId, mockNavigation, mockDesselecionarPet);

      // Verifica se a função deletarDocumento foi chamada com os parâmetros corretos
      expect(deletarDocumento).toHaveBeenCalledWith(`Usuario/${mockUsuarioId}/pets/`, mockPetId);

      // Verifica se a mensagem de erro foi exibida
      expect(Alert.alert).toHaveBeenCalledWith('Aviso', 'Ocorreu um erro ao tentar Excluir o Pet, tente novemante mais tarde.');

      // Verifica que a navegação NÃO foi chamada
      expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });
});