export const aplicarMascaraCPF = (cpf: any) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Aplica a máscara
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
};

export function aplicarMascaraDateTime(value: any) {

  if (!value) return '';

  let maskedValue = value.replace(/\D/g, '');

  if (maskedValue.length <= 2) {
    return maskedValue; // Dia (DD)
  } else if (maskedValue.length <= 4) {
    return maskedValue.replace(/(\d{2})(\d{1,2})/, '$1/$2'); // Dia/Mês (DD/MM)
  } else if (maskedValue.length <= 8) {
    return maskedValue.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3'); // Dia/Mês/Ano (DD/MM/YYYY)
  } else if (maskedValue.length <= 10) {
    return maskedValue.replace(/(\d{2})(\d{2})(\d{4})(\d{1,2})/, '$1/$2/$3 $4'); // Dia/Mês/Ano Hora (DD/MM/YYYY HH)
  } else {
    return maskedValue.replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{1,2})?/, '$1/$2/$3 $4:$5'); // Dia/Mês/Ano Hora:Minuto (DD/MM/YYYY HH:mm)
  }
};