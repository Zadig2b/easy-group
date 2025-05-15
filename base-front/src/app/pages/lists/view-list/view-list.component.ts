import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-list.component.html'
})
export class ListComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  listId!: string;
  persons: any[] = [];
  loading = true;
  message = '';

  personForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['MALE'],
    age: [20, Validators.required],
    frenchLevel: [2, Validators.required],
    techLevel: [2, Validators.required],
    oldDwwm: [false],
    profile: ['A_LAISE'],
  });

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('listId')!;
    this.loadPersons();
  }

  loadPersons(): void {
    this.loading = true;
    this.http.get<any[]>(`http://localhost:8080/api/lists/${this.listId}/persons`).subscribe({
      next: (data) => {
        this.persons = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message = 'Erreur de chargement';
      }
    });
  }

  addPerson(): void {
    if (this.personForm.valid) {
      this.http.post(`http://localhost:8080/api/lists/${this.listId}/persons`, this.personForm.value).subscribe({
        next: () => {
          this.message = '✅ Personne ajoutée';
          this.personForm.reset({ gender: 'MALE', profile: 'A_LAISE' });
          this.loadPersons();
        }
      });
    }
  }

  deletePerson(id: number): void {
    this.http.delete(`http://localhost:8080/api/lists/${this.listId}/persons/${id}`).subscribe({
      next: () => this.loadPersons()
    });
  }
}
