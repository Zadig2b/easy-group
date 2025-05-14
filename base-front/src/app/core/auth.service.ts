import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AuthUser {
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly authUrl = 'http://localhost:8080/api/auth';
  private readonly userUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token);
      }),
      switchMap(() => this.loadCurrentUser()) // 👈 on attend ici
    );
  }
  

  register(data: AuthUser & { password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.authUrl}/register`, data).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token);
        this.loadCurrentUser().subscribe(); // Charger l'utilisateur après register
      })
    );
  }

  loadCurrentUser(): Observable<AuthUser> {
    const token = localStorage.getItem('jwt');
    if (!token) return of(null as any);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<AuthUser>(`${this.userUrl}/me`, { headers }).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }
}
