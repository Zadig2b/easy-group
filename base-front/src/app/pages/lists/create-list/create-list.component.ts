import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListService } from '../../../core/services/list.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-list.component.html',
})
export class CreateListComponent {
  listForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private listService: ListService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.listForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.listForm.invalid) return;

    this.submitting = true;
    const name = this.listForm.value.name;

    this.listService.createList(name).subscribe({
      next: () => {
        this.toastService.show('Liste créée avec succès.', 'success');
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        console.error('Erreur lors de la création', err);
        this.submitting = false;

        if (err.status === 409) {
          this.toastService.show(err.error, 'error'); // message personnalisé du backend
        } else {
          this.toastService.show(
            'Une erreur est survenue lors de la création de la liste.'
          );
        }
      },
    });
  }
}
