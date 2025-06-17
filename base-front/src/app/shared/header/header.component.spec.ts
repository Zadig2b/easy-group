import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService, AuthUser } from '../../core/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GLOBAL_CONFIG } from '../../config/global.config';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockUser: AuthUser = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser$: of(mockUser),
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]), // ✅ Corrige l'erreur "no provider for ActivatedRoute"
        provideHttpClient(),
        { provide: AuthService, useValue: spy },
        { provide: GLOBAL_CONFIG, useValue: { appName: 'TestApp' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose app name', () => {
    expect(component.appName).toBe('TestApp');
  });

  it('should emit isLoggedIn$ as true when user exists', (done) => {
    component.isLoggedIn$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should call logout()', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
