import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  form!: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.form = this.fb.group({
      firstName: [user?.firstName || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required]
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.authService.updateUser(this.form.value).subscribe({
      next: () => this.message = '✅ Profil mis à jour',
      error: () => this.message = 'Erreur lors de la mise à jour'
    });
  }

  deleteAccount(): void {
    if (!confirm('Supprimer votre compte ?')) return;
    this.authService.deleteAccount().subscribe();
  }
}
