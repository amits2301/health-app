import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { SKIP_LOADING } from './loading.context';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);

  // Set this context for those api calls where we do not want overlay spinner on screen
  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }

  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
