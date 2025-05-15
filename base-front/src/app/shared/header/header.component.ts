import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Observable, map } from 'rxjs';
import { GLOBAL_CONFIG } from '../../config/global.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  private config = inject(GLOBAL_CONFIG);

  appName = this.config.appName;
  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      // convertit en booléen
      map((user) => !!user)
    );
  }

  logout() {
    this.authService.logout();
  }
}
