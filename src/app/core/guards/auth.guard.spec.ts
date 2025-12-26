import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let navigateCalledWith: any[] | null;

  beforeEach(() => {
    navigateCalledWith = null;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: (args: any[]) => {
              navigateCalledWith = args;
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
          },
        },
      ],
    });
  });

  it('should block unauthenticated users and redirect to login', () => {
    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBe(false);
    expect(navigateCalledWith).toEqual(['/login']);
  });

  it('should allow navigation for authenticated users', () => {
    TestBed.overrideProvider(AuthService, {
      useValue: {
        isAuthenticated: () => true,
      },
    });

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBe(true);
    expect(navigateCalledWith).toBeNull();
  });
});
