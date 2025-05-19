import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { Observable, map } from 'rxjs';
import { GLOBAL_CONFIG } from '../../config/global.config';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
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
