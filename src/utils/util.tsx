import CryptoJS from 'crypto-js';

export function validaEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validarCPF(cpf: string) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Função para calcular o dígito verificador
  const calcularDigito = (cpf: string, peso: number): number => {
    let soma = 0;
    for (let i = 0; i < peso; i++) {
      soma += parseInt(cpf[i], 10) * (peso + 1 - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  // Calcula os dígitos verificadores
  const digito1 = calcularDigito(cpf, 9);
  const digito2 = calcularDigito(cpf, 10);

  // Compara com os dígitos informados
  return cpf[9] === digito1.toString() && cpf[10] === digito2.toString();
};

export function cripitografarSenha(senha: any) {
  const encrypted = CryptoJS.SHA256(senha).toString();
  return encrypted;
}
