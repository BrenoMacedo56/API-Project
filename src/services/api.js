import axios from 'axios';
import { getToken, getRefreshToken, setTokens, removeTokens } from '../utils/storage';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

let api;

if (useMock) {
  api = {
    post: async (url, data) => {
      console.log(`📡 MOCK POST: ${url}`, data);

      switch (url) {
        case '/login':
          if (data.email === 'admin@teste.com' && data.password === '123456') {
            return {
              data: {
                tokens: {
                  accessToken: 'mock-access-token',
                  refreshToken: 'mock-refresh-token',
                },
              },
            };
          } else {
            return Promise.reject({
              response: {
                status: 401,
                data: { message: 'Credenciais inválidas' },
              },
            });
          }

        case '/refresh-token':
          return {
            data: {
              tokens: {
                accessToken: 'new-mock-access-token',
                refreshToken: 'new-mock-refresh-token',
              },
            },
          };

        default:
          return { data: {} };
      }
    },

    get: async (url) => {
      console.log(`📡 MOCK GET: ${url}`);

      switch (url) {
        case '/me':
          return {
            data: {
              name: 'Usuário Mock',
              email: 'admin@teste.com',
              id: 1,
            },
          };

        default:
          return { data: {} };
      }
    },
  };
} else {
  api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error('Refresh token não encontrado');

          const response = await api.post('/refresh-token', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;

          setTokens(accessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          removeTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default api;
