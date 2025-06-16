import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, of, tap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'; // en haut
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

export interface AuthUser {
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSig = signal<AuthUser | null>(null);
  public currentUser$ = toObservable(this.currentUserSig);

  private readonly authUrl = `${environment.apiBaseUrl}/auth`;
  private readonly userUrl = `${environment.apiBaseUrl}/user`;
  public readonly isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));
  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

loadUserFromToken(): Observable<AuthUser | null> {
  const token = this.getToken();
  if (!token) {
    return of(null);
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<AuthUser>(`${this.userUrl}/me`, { headers }).pipe(
    tap((user) => this.currentUserSig.set(user)),
    map((user) => user),
    catchError(() => {
      this.logout();
      return of(null);
    })
  );
}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http
      .post<{ token: string }>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('jwt', response.token);
        }),
        switchMap(() => this.loadCurrentUser())
      );
  }

  register(data: AuthUser & { password: string }): Observable<any> {
    return this.http.post<{ message: string }>(`${this.authUrl}/register`, data).pipe(
      tap(() => {
        alert('Veuillez vérifier votre email pour activer votre compte.');
      })
    );
  }

  loadCurrentUser(): Observable<AuthUser> {
    const token = localStorage.getItem('jwt');
    if (!token) return of(null as any);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<AuthUser>(`${this.userUrl}/me`, { headers })
      .pipe(tap((user) => this.currentUserSig.set(user)));
  }

  updateUser(data: { firstName: string; lastName: string }): Observable<AuthUser> {
    return this.http
      .put<AuthUser>(`${this.userUrl}/me`, data)
      .pipe(tap((user) => this.currentUserSig.set(user)));
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/me`).pipe(
      tap(() => {
        this.logout();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.currentUserSig.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSig();
  }

  getUser(): AuthUser | null {
    return this.currentUserSig();
  }
  getToken(): string | null {
    // console.log(localStorage.getItem('jwt'));

    return localStorage.getItem('jwt');
  }

  confirmEmail(token: string) {
    return this.http.get(`${this.authUrl}/confirm`, { params: { token } });
  }
}
