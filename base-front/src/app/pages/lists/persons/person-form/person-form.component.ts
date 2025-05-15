import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  listId = this.route.snapshot.paramMap.get('listId')!;
  message = '';

  personForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    gender: ['MALE', Validators.required],
    age: [20, [Validators.required, Validators.min(1)]],
    frenchLevel: [3, [Validators.required, Validators.min(1), Validators.max(4)]],
    oldDwwm: [false],
    techLevel: [2, [Validators.required, Validators.min(1), Validators.max(4)]],
    profile: ['A_LAISE', Validators.required],
  });

  submit(): void {
    if (this.personForm.valid) {
      this.http.post(`http://localhost:8080/api/lists/${this.listId}/persons`, this.personForm.value).subscribe(() => {
        this.message = '✅ Personne ajoutée !';
        this.personForm.reset();
      });
    }
  }
}
