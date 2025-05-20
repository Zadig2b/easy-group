import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnChanges {
  @Input() listId!: string;
  @Input() refreshToken: number = 0;
  @Output() personDeleted = new EventEmitter<number>(); // 👈

  persons: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listId'] || changes['refreshToken']) {
      this.loadPersons();
    }
  }

  private mapPersonToDisplay(p: any): any {
    return {
      ...p,
      genderLabel: this.getGenderLabel(p.gender),
      profileLabel: this.getProfileLabel(p.profile),
      oldDwwmLabel: p.oldDwwm ? 'Ancien DWWM' : 'Nouveau DWWM',
      frenchLevelLabel: `${p.frenchLevel}/5`,
      techLevelLabel: `${p.techLevel}/5`,
    };
  }

  private getGenderLabel(gender: string): string {
    switch (gender) {
      case 'MALE':
        return 'Homme';
      case 'FEMALE':
        return 'Femme';
      case 'UNDISCLOSED':
        return 'Non spécifié';
      default:
        return gender;
    }
  }

  private getProfileLabel(profile: string): string {
    switch (profile) {
      case 'TIMIDE':
        return 'Timide';
      case 'RESERVE':
        return 'Réservé';
      case 'A_LAISE':
        return 'À l’aise';
      default:
        return profile;
    }
  }

  loadPersons(): void {
    if (!this.listId) return;

    this.loading = true;
    this.http
      .get<any[]>(`${environment.apiBaseUrl}/lists/${this.listId}/persons`)
      .subscribe({
        next: (data) => {
          this.persons = data.map((p) => this.mapPersonToDisplay(p));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  deletePerson(id: number): void {
    this.http
      .delete(`${environment.apiBaseUrl}/lists/${this.listId}/persons/${id}`)
      .subscribe({
        next: () => {
          this.persons = this.persons.filter((p) => p.id !== id); // suppression directe locale
          this.personDeleted.emit(this.persons.length); // 👈 nouvelle taille émise
        },
        error: () => {
          console.error('Erreur lors de la suppression');
        },
      });
  }
}
