import { TestBed } from '@angular/core/testing';
import { AuthService, AuthUser } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy },
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token then load user', () => {
    const mockUser: AuthUser = { email: 'test@test.com', firstName: 'Test', lastName: 'User' };
    const token = 'fake-token';

    service.login('test@test.com', 'password123').subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem('jwt')).toBe(token);
    });

    const reqLogin = httpMock.expectOne(`${service['authUrl']}/login`);
    expect(reqLogin.request.method).toBe('POST');
    reqLogin.flush({ token });

    const reqMe = httpMock.expectOne(`${service['userUrl']}/me`);
    expect(reqMe.request.method).toBe('GET');
    reqMe.flush(mockUser);
  });

  it('should register and show alert', () => {
    spyOn(window, 'alert');
    service
      .register({ email: 'a@a.com', password: '123', firstName: 'A', lastName: 'B' })
      .subscribe();

    const req = httpMock.expectOne(`${service['authUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'ok' });

    expect(window.alert).toHaveBeenCalledWith('Veuillez vérifier votre email pour activer votre compte.');
  });

  it('should handle loadUserFromToken without token', (done) => {
    service.loadUserFromToken().subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should load user from token', () => {
    const token = 'jwt-token';
    const user: AuthUser = { email: 'u@u.com' };
    localStorage.setItem('jwt', token);

    service.loadUserFromToken().subscribe((res) => {
      expect(res).toEqual(user);
    });

    const req = httpMock.expectOne(`${service['userUrl']}/me`);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(user);
  });

  it('should logout and redirect on loadUserFromToken error', () => {
    const token = 'bad-token';
    localStorage.setItem('jwt', token);

    service.loadUserFromToken().subscribe((res) => {
      expect(res).toBeNull();
      expect(localStorage.getItem('jwt')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    const req = httpMock.expectOne(`${service['userUrl']}/me`);
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should update user', () => {
    const user: AuthUser = { email: 'a@a.com', firstName: 'A', lastName: 'B' };
    service.updateUser({ firstName: 'A', lastName: 'B' }).subscribe((res) => {
      expect(res).toEqual(user);
    });

    const req = httpMock.expectOne(`${service['userUrl']}/me`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('should delete account and logout', () => {
    service.deleteAccount().subscribe(() => {
      expect(localStorage.getItem('jwt')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    const req = httpMock.expectOne(`${service['userUrl']}/me`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should return isLoggedIn status', () => {
    expect(service.isLoggedIn()).toBeFalse();
    (service as any).currentUserSig.set({ email: 'x@x.com' });
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return current user', () => {
    expect(service.getUser()).toBeNull();
    const user = { email: 'a@a.com' };
    (service as any).currentUserSig.set(user);
    expect(service.getUser()).toEqual(user);
  });

  it('should return jwt from localStorage', () => {
    localStorage.setItem('jwt', '123');
    expect(service.getToken()).toBe('123');
  });

  it('should confirm email with token', () => {
    service.confirmEmail('token123').subscribe();

    const req = httpMock.expectOne(`${service['authUrl']}/confirm?token=token123`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
