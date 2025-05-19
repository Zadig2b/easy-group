import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../core/models/person.model';
import { generateGroups } from '../../../../utils/group-generator';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-submit-draw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-draw.component.html',
  styleUrl: './submit-draw.component.scss',
})
export class SubmitDrawComponent {
  @Input() listId!: string;
  @Input() persons: Person[] = [];
  @Input() groupCount: number = 2;
  @Input() refreshList: () => void = () => {};
  @Output() drawSubmitted = new EventEmitter<void>(); // 👉 ici

  message = '';
  loading = false;

  constructor(private http: HttpClient) {}

  generateAndSubmitGroups(): void {
    const generatedGroups = generateGroups(this.persons, this.groupCount);

    if (!this.listId || generatedGroups.length === 0) return;

    this.loading = true;

    this.http
      .post(`http://localhost:8080/api/lists/${this.listId}/draws`, {
        groups: generatedGroups,
      })
      .subscribe({
        next: () => {
          this.message = '✅ Groupes enregistrés !';
          this.refreshList();
          this.drawSubmitted.emit(); 
          // 👉 notifie le parent
          this.loading = false;
        },
        error: () => {
          this.message = '❌ Une erreur est survenue.';
          this.loading = false;
        },
      });
  }
}
