export interface LoadingState {
  status: 'init' | 'loading' | 'loaded' | 'error';
  error?: string;
}