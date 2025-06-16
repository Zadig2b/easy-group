import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['loadUserFromToken']);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('allows activation when user is loaded', (done) => {
    authService.loadUserFromToken.and.returnValue(of({ email: 't' } as any));
    guard.canActivate({} as any, { url: '/' } as any).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('redirects when no user', (done) => {
    const tree = {} as any;
    router.createUrlTree.and.returnValue(tree);
    authService.loadUserFromToken.and.returnValue(of(null));
    guard.canActivate({} as any, { url: '/' } as any).subscribe((result) => {
      expect(result).toBe(tree);
      done();
    });
  });
});
