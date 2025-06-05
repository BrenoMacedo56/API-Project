import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(0);

  const refetch = () => {
    setShouldRefetch(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api({
          url,
          method: options.method || 'GET',
          data: options.data,
          params: options.params,
        });
        
        setData(response.data);
      } catch (err) {
        setError(err.response?.data || { message: 'Erro ao carregar dados' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options.method, shouldRefetch]);

  return { data, loading, error, refetch };
};
