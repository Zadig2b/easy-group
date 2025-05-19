import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router // 👈 injecte le routeur
  ) {}

  ngOnInit(): void {
    // Redirige immédiatement si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }
  
    // Form init
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

onSubmit() {
  if (this.form.valid) {
    this.errorMessage = null;

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: user => {
        console.log('Connecté en tant que', user);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    });

  } else {
    this.form.markAllAsTouched();
  }
}

}
