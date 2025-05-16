import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../models/person.model';
import { generateGroups } from '../../../../utils/group-generator';


@Component({
  selector: 'app-submit-draw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-draw.component.html',
})
export class SubmitDrawComponent {
  @Input() listId!: string;
  @Input() persons: Person[] = [];
  @Input() groupCount = 2;
  @Input() refreshList: () => void = () => {};

  message = '';
  loading = false;

  constructor(private http: HttpClient) {}

  generateAndSubmitGroups(): void {
    const generatedGroups = generateGroups(this.persons, this.groupCount);

    if (!this.listId || generatedGroups.length === 0) return;

    this.loading = true;

    this.http.post(`http://localhost:8080/api/lists/${this.listId}/draws`, {
      groups: generatedGroups
    }).subscribe({
      next: () => {
        this.message = '✅ Groupes enregistrés !';
        this.refreshList();
        this.loading = false;
      },
      error: () => {
        this.message = '❌ Une erreur est survenue.';
        this.loading = false;
      }
    });
  }
}
