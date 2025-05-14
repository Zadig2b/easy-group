import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Observable, map } from 'rxjs';
import { AppConfig } from '../../config/app.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  appName = AppConfig.appName;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      // convertit en booléen
      map(user => !!user)
    );
  }

  logout() {
    this.authService.logout();
  }
}
