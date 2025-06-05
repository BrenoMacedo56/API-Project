// Funções para validação de dados

// Valida se o email está em formato correto
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valida se a senha tem pelo menos 6 caracteres
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Valida se o campo não está vazio
export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

// Valida se o valor é um número
export const validateNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Valida se o valor é positivo
export const validatePositive = (value) => {
  return validateNumber(value) && parseFloat(value) > 0;
};
