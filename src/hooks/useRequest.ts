import { useState, useEffect, useCallback } from 'react';

export interface Response<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

export function useRequest<T>(requestFunction: () => Promise<T>): Response<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>({} as T);

  const memoRequestFunction = useCallback(requestFunction, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await memoRequestFunction();
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [memoRequestFunction]);

  return { data, isLoading, error };
}
