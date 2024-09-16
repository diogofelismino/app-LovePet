import { lerDocumento } from "../../src/service/request-padrao-firebase";
import { cripitografarSenha, validaEmail, validarCPF, validateDateTime, verificarId } from "../../src/utils/util"


jest.mock('../../src/service/request-padrao-firebase');


describe("../../src/utils/util", () => {
  describe("validaEmail", () => {

    it("deve retornar true caso o email esteja no formato correto", () => {
      const result = validaEmail("teste@gmail.com");
      expect(true).toEqual(result);
    });

    it("deve retornar false caso o email esteja no formato incorreto", () => {
      const result = validaEmail("testegmail.com");
      expect(false).toEqual(result);
    });
  });

  describe('validarCPF', () => {
    it('deve validar um CPF válido', () => {
      expect(validarCPF('123.456.789-09')).toBe(true); // Substitua por um CPF válido
    });

    it('deve invalidar um CPF com dígitos inválidos', () => {
      expect(validarCPF('123.456.789-00')).toBe(false); // Substitua por um CPF inválido
    });

    it('deve invalidar um CPF com caracteres não numéricos', () => {
      expect(validarCPF('abc.def.ghi-jk')).toBe(false);
    });

    it('deve invalidar um CPF com menos de 11 dígitos', () => {
      expect(validarCPF('123.456.789')).toBe(false);
    });

    it('deve invalidar um CPF com mais de 11 dígitos', () => {
      expect(validarCPF('123.456.789-01234')).toBe(false);
    });

    it('deve invalidar um CPF onde todos os dígitos são iguais', () => {
      expect(validarCPF('111.111.111-11')).toBe(false);
    });
  });

  describe('cripitografarSenha', () => {
    it('Deve criptografar a senha corretamente', () => {
      const senha = 'minhaSenha123';
      const senhaCriptografada = cripitografarSenha(senha);

      expect(senhaCriptografada).not.toBe(senha); // Garante que a senha foi criptografada (não é igual ao valor original)
      expect(senhaCriptografada).toBeTruthy(); // Garante que a senha criptografada existe
    });
  });
});

describe('verificarId', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('deve retornar o próximo ID como string quando há IDs disponíveis', async () => {
    // Mock de lerDocumento para retornar uma lista de IDs
    (lerDocumento as jest.Mock).mockResolvedValue([
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ]);

    const resultado = await verificarId('caminho/qualquer');
    expect(resultado).toBe('4'); // O próximo ID após o máximo de 3 é 4
  });

  test('deve retornar "1" quando a lista de IDs estiver vazia', async () => {
    // Mock de lerDocumento para retornar uma lista vazia
    (lerDocumento as jest.Mock).mockResolvedValue([]);

    const resultado = await verificarId('caminho/qualquer');
    expect(resultado).toBe('1'); // Se não há IDs, o retorno deve ser "1"
  });

  test('deve retornar "1" quando lerDocumento retornar null', async () => {
    // Mock de lerDocumento para retornar null
    (lerDocumento as jest.Mock).mockResolvedValue(null);

    const resultado = await verificarId('caminho/qualquer');
    expect(resultado).toBe('1'); // Se lerDocumento retornar null, o retorno deve ser "1"
  });

  test('deve retornar "1" quando lerDocumento retornar um valor não array', async () => {
    // Mock de lerDocumento para retornar um valor que não é um array
    (lerDocumento as jest.Mock).mockResolvedValue('string-inesperado');

    const resultado = await verificarId('caminho/qualquer');
    expect(resultado).toBe('1'); // Se lerDocumento retornar algo que não é um array, o retorno deve ser "1"
  });
});

describe('validateDateTime', () => {
  test('deve retornar true para data e hora válidas e futuras', () => {
    const result = validateDateTime('15/09/2026 14:30');
    expect(result).toBe(true);
  });

  test('deve retornar false para data e hora no formato incorreto', () => {
    const result1 = validateDateTime('15-09-2024 14:30'); // Formato incorreto
    const result2 = validateDateTime('2024/09/15 14:30'); // Formato incorreto
    const result3 = validateDateTime('15/09/2024 99:30'); // Hora inválida
    const result4 = validateDateTime('15/09/2024 14:60'); // Minuto inválido

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  test('deve retornar false para data e hora passadas', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Um dia no passado
    const formattedPastDate = `${pastDate.getDate().toString().padStart(2, '0')}/${(pastDate.getMonth() + 1).toString().padStart(2, '0')}/${pastDate.getFullYear()} ${pastDate.getHours().toString().padStart(2, '0')}:${pastDate.getMinutes().toString().padStart(2, '0')}`;

    const result = validateDateTime(formattedPastDate);
    expect(result).toBe(false);
  });

  test('deve retornar false para strings vazias ou nulas', () => {
    const result1 = validateDateTime('');
    const result2 = validateDateTime(null);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  test('deve retornar true para uma data e hora no formato correto e futura', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Um dia no futuro
    const formattedFutureDate = `${futureDate.getDate().toString().padStart(2, '0')}/${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getFullYear()} ${futureDate.getHours().toString().padStart(2, '0')}:${futureDate.getMinutes().toString().padStart(2, '0')}`;

    const result = validateDateTime(formattedFutureDate);
    expect(result).toBe(true);
  });
});