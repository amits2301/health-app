import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { SKIP_LOADING } from '../interceptors/loading.context';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_email';

  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  login(payload: { email: string; password: string }) {
    return this.http
      .post<any>('/login', payload, {
        context: new HttpContext().set(SKIP_LOADING, true),
      })
      .pipe(
        tap((res) => {
          this.cookies.set(this.TOKEN_KEY, res.token);
          this.cookies.set(this.USER_KEY, res.user.email);
        })
      );
  }

  logout() {
    this.cookies.delete(this.TOKEN_KEY);
    this.cookies.delete(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return this.cookies.check(this.TOKEN_KEY);
  }

  getUserEmail(): string {
    return this.cookies.get(this.USER_KEY);
  }
}
