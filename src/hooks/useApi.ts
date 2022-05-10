import { Reducer, useCallback, useReducer } from 'react';

type UseApiState<T> = { isLoading: boolean; response?: T, error?: unknown };
type UseApiAction<T> = { type: 'start' } | { type: 'done', response: T } | { type: 'error', error: unknown };
type UseApiReducer<T> = Reducer<UseApiState<T>, UseApiAction<T>>;

const reducer = <T>(previousState: UseApiState<T>, action: UseApiAction<T>) => {
  switch (action.type) {
    case 'start':
      return { ...previousState, isLoading: true, error: undefined };

    case 'done':
      return { isLoading: false, response: action.response };

    case 'error':
      return { isLoading: false, response: undefined, error: action.error };
  }
};

const initialState = { isLoading: false };

const useApi = <TArgs extends unknown[], TResponse>(api: (...args: TArgs) => PromiseLike<TResponse>) => {
  const [{ isLoading, response, error }, dispatch] = useReducer<UseApiReducer<TResponse>>(reducer, initialState);

  const request = useCallback(async (...args: TArgs) => {
    dispatch({ type: 'start' });
    try {
      const response = await api(...args);
      dispatch({ type: 'done', response });
      return response;
    } catch (error) {
      dispatch({ type: 'error', error });
      throw error;
    }
  }, [api]);

  return [request, { isLoading, response, error }] as const;
};

export { useApi };