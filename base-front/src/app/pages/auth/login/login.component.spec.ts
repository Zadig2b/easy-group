import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to /dashboard if already logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    component.ngOnInit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should initialize the form if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    component.ngOnInit();

    expect(component.form).toBeDefined();
    expect(component.form.controls['email']).toBeDefined();
    expect(component.form.controls['password']).toBeDefined();
  });

  it('should login and redirect if form is valid', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    authServiceSpy.login.and.returnValue(of({ email: 'test@example.com' }));

    component.ngOnInit();
    component.form.setValue({ email: 'test@example.com', password: 'pass123' });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'pass123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBeNull();
  });

  it('should set error message if login fails', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Unauthorized')));

    component.ngOnInit();
    component.form.setValue({ email: 'fail@example.com', password: 'wrongpass' });

    component.onSubmit();

    expect(component.errorMessage).toBe('Email ou mot de passe invalide');
  });

  it('should mark form as touched if invalid', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    component.ngOnInit();
    component.form.setValue({ email: '', password: '' });

    const markSpy = spyOn(component.form, 'markAllAsTouched').and.callThrough();

    component.onSubmit();

    expect(markSpy).toHaveBeenCalled();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
