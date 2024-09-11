import { Alert } from "react-native";
import { PetDto } from "../../../src/model/Dto/pets-dto/pet-dto";
import { calcularIdade, validarCampos } from "../../../src/service/cadastrar-pet/request-cadastar-pet";



jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));


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
        'sad'
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