import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface GroupDto {
  name: string;
  memberIds: number[];
}

interface DrawDto {
  id: number;
  createdAt: string;
  groups: GroupDto[];
}

@Component({
  selector: 'app-draw-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-history.component.html',
})
export class DrawHistoryComponent implements OnInit {
  @Input() listId!: string;

  draws: DrawDto[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.listId) {
      this.http.get<DrawDto[]>(`http://localhost:8080/api/lists/${this.listId}/draws`).subscribe({
        next: (data) => {
          this.draws = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
