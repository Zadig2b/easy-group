import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Validation en cours...</p>',
})
export class ConfirmEmailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token') || '';
    this.auth.confirmEmail(token).subscribe({
      next: () => {
        alert('Votre compte est activé. Vous pouvez vous connecter.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Lien invalide');
        this.router.navigate(['/']);
      }
    });
  }
}
