import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Group {
  name: string;
  memberIds: number[];
}

@Component({
  selector: 'app-submit-draw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-draw.component.html',
})
export class SubmitDrawComponent {
  @Input() listId!: string;
  @Input() groups: Group[] = [];

  message = '';
  loading = false;

  constructor(private http: HttpClient) {}

  submit(): void {
    if (!this.listId || this.groups.length === 0) return;

    this.loading = true;
    this.http.post(`http://localhost:8080/api/lists/${this.listId}/draws`, { groups: this.groups }).subscribe({
      next: () => {
        this.message = '✅ Tirage enregistré';
        this.loading = false;
      },
      error: () => {
        this.message = '❌ Erreur lors de l’enregistrement';
        this.loading = false;
      },
    });
  }
}
