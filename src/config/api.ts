// src/config/api.ts
type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';

const API_CONFIG = {
  DEVELOPMENT: "https://67524886d1983b9597b5c5e5.mockapi.io/chat", // Trocamos :endpoint por chat
  PRODUCTION: import.meta.env.VITE_API_URL,
  TEST: "https://67524886d1983b9597b5c5e5.mockapi.io/chat"
};

export const getApiUrl = (): string => {
  const environment = (import.meta.env.MODE || 'development').toUpperCase() as Environment;
  return API_CONFIG[environment];
};