// Funções para formatação de dados

// Formata valores monetários
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formata datas para o padrão brasileiro
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Formata datas com hora para o padrão brasileiro
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Capitaliza a primeira letra de uma string
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Formata o nome completo do usuário
export const formatFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
