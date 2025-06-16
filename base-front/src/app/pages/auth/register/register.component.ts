import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: [''],
      lastName: ['']
    });
  }

  onSubmit() {
    if (this.form.valid && this.passwordsMatch()) {
      this.authService.register(this.form.value).subscribe(() => {
        this.form.reset();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  passwordsMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
