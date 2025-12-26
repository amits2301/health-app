import { LoadingState } from './loading-state';

export const initialLoadingState: LoadingState = {
  status: 'init',
};

export const loadingReducer = {
  query: <T extends LoadingState>(state: T): T => ({
    ...state,
    status: 'loading',
    error: null,
  }),
  success: <T extends LoadingState>(state: T): T => ({
    ...state,
    status: 'loaded',
    error: null,
  }),
  fail: <T extends LoadingState>(state: T, error?: string): T => ({
    ...state,
    status: 'error',
    error,
  }),
};
