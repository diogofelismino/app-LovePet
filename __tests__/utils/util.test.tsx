import { lerDocumento } from "../../src/service/request-padrao-firebase";
import { combineDateAndTime, converterDataParaString, cripitografarSenha, mudarData, validaEmail, validarCPF, validateDateTime, verificarId } from "../../src/utils/util"


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

describe('converterDataParaString', () => {
  it('deve converter um objeto Date para a string no formato DD/MM/YYYY HH:mm', () => {
    const data = new Date('2024-10-10T14:47:00'); // Data e hora a serem testadas
    const resultado = converterDataParaString(data);
    
    expect(resultado).toBe('10/10/2024 14:47'); // Verifica se a conversão está correta
  });

  it('deve adicionar zeros à esquerda quando necessário', () => {
    const data = new Date('2024-01-01T03:05:00'); // Data e hora a serem testadas
    const resultado = converterDataParaString(data);
    
    expect(resultado).toBe('01/01/2024 03:05'); // Verifica se a conversão está correta
  });

  it('deve funcionar para a meia-noite', () => {
    const data = new Date('2024-10-10T00:00:00'); // Data e hora a serem testadas
    const resultado = converterDataParaString(data);
    
    expect(resultado).toBe('10/10/2024 00:00'); // Verifica se a conversão está correta
  });

  it('deve funcionar para o último minuto do dia', () => {
    const data = new Date('2024-10-10T23:59:00'); // Data e hora a serem testadas
    const resultado = converterDataParaString(data);
    
    expect(resultado).toBe('10/10/2024 23:59'); // Verifica se a conversão está correta
  });
});

describe('combineDateAndTime', () => {
  it('deve combinar data, hora e minuto corretamente', () => {
    const date = new Date('2023-11-08T00:00:00');
    const hora = 15;
    const minuto = 30;

    const result = combineDateAndTime(date, hora, minuto);

    // Verificar se o ano, mês e dia correspondem ao valor de "date"
    expect(result.getFullYear()).toBe(date.getFullYear());
    expect(result.getMonth()).toBe(date.getMonth());
    expect(result.getDate()).toBe(date.getDate());

    // Verificar se a hora e o minuto foram definidos corretamente
    expect(result.getHours()).toBe(hora);
    expect(result.getMinutes()).toBe(minuto);
  });

  it('deve funcionar corretamente com horas e minutos iguais a zero', () => {
    const date = new Date('2023-11-08T00:00:00');
    const hora = 0;
    const minuto = 0;

    const result = combineDateAndTime(date, hora, minuto);

    expect(result.getHours()).toBe(hora);
    expect(result.getMinutes()).toBe(minuto);
  });

  it('deve funcionar corretamente com horas e minutos no limite', () => {
    const date = new Date('2023-11-08T00:00:00');
    const hora = 23;
    const minuto = 59;

    const result = combineDateAndTime(date, hora, minuto);

    expect(result.getHours()).toBe(hora);
    expect(result.getMinutes()).toBe(minuto);
  });
});