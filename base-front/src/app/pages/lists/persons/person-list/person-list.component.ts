import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnChanges {
  @Input() listId!: string;
  @Input() refreshToken: number = 0;

  persons: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listId'] || changes['refreshToken']) {
      this.loadPersons();
    }
  }

  loadPersons(): void {
    if (!this.listId) return;

    this.loading = true;
    this.http.get<any[]>(`http://localhost:8080/api/lists/${this.listId}/persons`).subscribe({
      next: (data) => {
        this.persons = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

    deletePerson(id: number): void {
    this.http.delete(`http://localhost:8080/api/lists/${this.listId}/persons/${id}`).subscribe({
      next: () => this.loadPersons()
    });
  }
}
