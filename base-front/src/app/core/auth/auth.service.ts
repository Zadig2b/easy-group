import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'; // en haut
import { map } from 'rxjs/operators';

export interface AuthUser {
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly authUrl = `${environment.apiBaseUrl}/auth`;
  private readonly userUrl = `${environment.apiBaseUrl}/user`;
  public readonly isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));
  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.http.get<AuthUser>(`${this.userUrl}/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout(), // token invalide ? on force logout
      });
    }
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
    return this.http
      .post<{ token: string }>(`${this.authUrl}/register`, data)
      .pipe(
        tap((response) => {
          localStorage.setItem('jwt', response.token);
          this.loadCurrentUser().subscribe(); // Charger l'utilisateur après register
          this.router.navigate(['/dashboard']);
        })
      );
  }

  loadCurrentUser(): Observable<AuthUser> {
    const token = localStorage.getItem('jwt');
    if (!token) return of(null as any);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<AuthUser>(`${this.userUrl}/me`, { headers })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }
  getToken(): string | null {
    // console.log(localStorage.getItem('jwt'));

    return localStorage.getItem('jwt');
  }
}
