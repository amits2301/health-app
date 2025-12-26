import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';
import { AuthService } from '../../../core/services/auth.service';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  // mutable mock (important)
  let authServiceMock: {
    login: (payload: { email: string; password: string }) => any;
  };

  beforeEach(async () => {
    authServiceMock = {
      login: () => of({}), // default success
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when form is invalid', () => {
    component.submit();

    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should call login service when form is valid', () => {
    component.form.setValue({
      email: 'test@test.com',
      password: '123456',
    });

    component.submit();

    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should set error message when login fails', () => {
    // change behavior only for this test
    authServiceMock.login = () =>
      throwError(() => new Error('Invalid credentials'));

    component.form.setValue({
      email: 'test@test.com',
      password: '123456',
    });

    component.submit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('Invalid email or password');
  });
});
