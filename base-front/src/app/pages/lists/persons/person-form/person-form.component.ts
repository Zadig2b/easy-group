import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  @Input() listId!: string;
  @Output() personAdded = new EventEmitter<void>();

  message = '';
  showForm = false;

  personForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    gender: ['MALE', Validators.required],
    age: [20, [Validators.required, Validators.min(1)]],
    frenchLevel: [3, [Validators.required, Validators.min(1), Validators.max(4)]],
    oldDwwm: [false],
    techLevel: [2, [Validators.required, Validators.min(1), Validators.max(4)]],
    profile: ['A_LAISE', Validators.required],
  });

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  submit(): void {
    if (this.personForm.valid && this.listId) {
      this.http.post(`http://localhost:8080/api/lists/${this.listId}/persons`, this.personForm.value).subscribe(() => {
        this.message = '✅ Personne ajoutée !';
        this.personForm.reset({
          name: '',
          gender: 'MALE',
          age: 20,
          frenchLevel: 3,
          techLevel: 2,
          oldDwwm: false,
          profile: 'A_LAISE'
        });

        Object.keys(this.personForm.controls).forEach((key) => {
          const control = this.personForm.get(key);
          control?.markAsDirty();
          control?.markAsTouched();
        });
        this.personForm.updateValueAndValidity();

        this.showForm = false;
        this.personAdded.emit();
      });
    }
  }
}
