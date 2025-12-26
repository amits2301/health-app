import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  let cookies: {
    setCalls: Array<[string, string]>;
    deletedKeys: string[];
  };

  beforeEach(() => {
    cookies = {
      setCalls: [],
      deletedKeys: [],
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: CookieService,
          useValue: {
            set: (key: string, value: string) => {
              cookies.setCalls.push([key, value]);
            },
            get: () => '',
            check: () => true,
            delete: (key: string) => {
              cookies.deletedKeys.push(key);
            },
          },
        },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should store token and user email on successful login', () => {
    service.login({ email: 'test@test.com', password: '123456' }).subscribe();

    const req = httpMock.expectOne('/login');
    expect(req.request.method).toBe('POST');

    req.flush({
      token: 'fake-token',
      user: { email: 'test@test.com' },
    });
    const hasToken = cookies.setCalls.some(
      ([key, value]) => key === 'auth_token' && value === 'fake-token'
    );

    const hasEmail = cookies.setCalls.some(
      ([key, value]) => key === 'user_email' && value === 'test@test.com'
    );

    expect(hasToken).toBe(true);
    expect(hasEmail).toBe(true);
  });

  it('should return true when user is authenticated', () => {
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should clear cookies on logout', () => {
    service.logout();

    expect(cookies.deletedKeys).toContain('auth_token');
    expect(cookies.deletedKeys).toContain('user_email');
  });
});
