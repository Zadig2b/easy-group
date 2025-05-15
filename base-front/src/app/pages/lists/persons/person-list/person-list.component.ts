import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  persons: any[] = [];
  listId!: string;
  loading = true;

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('listId')!;
    this.http.get<any[]>(`http://localhost:8080/api/lists/${this.listId}/persons`).subscribe({
      next: (data) => {
        this.persons = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
