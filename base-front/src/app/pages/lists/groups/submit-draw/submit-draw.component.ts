import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../core/models/person.model';
import { generateGroups } from '../../../../utils/group-generator';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { DrawDto } from '../../../../core/models/draw.dto';
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
  drawTitle: string = '';

  constructor(private http: HttpClient) {}

  generateAndSubmitGroups() {
    if (
      !this.groupCount ||
      this.groupCount < 1 ||
      this.groupCount > this.persons.length
    ) {
      this.message = 'Veuillez entrer une taille de groupe valide.';
      return;
    }

    const groups = generateGroups(this.persons, this.groupCount);

    const drawDto: DrawDto = {
      title: this.drawTitle?.trim() || null,
      groups: generateGroups(this.persons, this.groupCount),
    };

    this.loading = true;
    this.http
      .post(`${environment.apiBaseUrl}/lists/${this.listId}/draws`, drawDto)
      .subscribe({
        next: () => {
          this.message = '🎉 Tirage enregistré avec succès !';
          this.drawSubmitted.emit();
          this.drawTitle = '';
          this.loading = false;
        },
        error: () => {
          this.message = "❌ Une erreur est survenue lors de l'enregistrement.";
          this.loading = false;
        },
      });
  }
}
