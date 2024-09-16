import CryptoJS from 'crypto-js';
import { lerDocumento } from '../service/request-padrao-firebase';
import { Alert } from 'react-native';

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


export async function verificarId(caminho: any) {
  var dados = await lerDocumento(caminho)
  if (dados?.length > 0 && Array.isArray(dados)) {
    const maxId = Math.max(...dados.map((item: any) => Number(item.id)));
    // Retornar o próximo ID como string
    return (maxId + 1).toString();
  }
  else
    return '1'
}

export function validateDateTime(dateTime: any) {
  if (!dateTime || typeof dateTime !== 'string') {
    return false;
  }

  // Regex para validar o formato DD/MM/YYYY HH:mm
  const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
  const match = dateTime.match(regex);

  // Se match for null, a data está em formato inválido
  if (!match) {
    return false;
  }

  // Desestrutura o resultado do match
  const [, day, month, year, hours, minutes] = match;

  // Validar que o dia, mês, ano, horas e minutos são números válidos
  const dayNumber = parseInt(day, 10);
  const monthNumber = parseInt(month, 10);
  const yearNumber = parseInt(year, 10);
  const hoursNumber = parseInt(hours, 10);
  const minutesNumber = parseInt(minutes, 10);

  if (
    isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber) ||
    isNaN(hoursNumber) || isNaN(minutesNumber) ||
    monthNumber < 1 || monthNumber > 12 ||
    dayNumber < 1 || dayNumber > 31 ||
    hoursNumber < 0 || hoursNumber > 23 ||
    minutesNumber < 0 || minutesNumber > 59
  ) {
    return false;
  }

  // Criar o objeto Date
  const dateObject = new Date(yearNumber, monthNumber - 1, dayNumber, hoursNumber, minutesNumber);

  // Verificar se a data é inválida ou se é no passado
  if (
    dateObject.getFullYear() !== yearNumber ||
    dateObject.getMonth() !== monthNumber - 1 ||
    dateObject.getDate() !== dayNumber ||
    dateObject.getHours() !== hoursNumber ||
    dateObject.getMinutes() !== minutesNumber ||
    dateObject < new Date()
  ) {
    return false;
  }

  return true;
};
