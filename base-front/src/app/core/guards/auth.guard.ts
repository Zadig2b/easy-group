import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.loadUserFromToken().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      }),
      catchError(() =>
        of(
          this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url },
          })
        )
      )
    );
  }
}
