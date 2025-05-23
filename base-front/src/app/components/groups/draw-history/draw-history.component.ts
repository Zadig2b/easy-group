import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { GroupDto } from '../../../core/models/group.dto';
import { DrawDto } from '../../../core/models/draw.dto';

@Component({
  selector: 'app-draw-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-history.component.html',
  styleUrls: ['./draw-history.component.scss'],
})
export class DrawHistoryComponent implements OnInit {
  @Input() listId!: string;

  draws: DrawDto[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.listId) {
      this.http
        .get<DrawDto[]>(`${environment.apiBaseUrl}/lists/${this.listId}/draws`)
        .subscribe({
          next: (data) => {
            this.draws = data
              .filter(
                (d): d is DrawDto & { createdAt: string } => !!d.createdAt
              )
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );

            this.loading = false;
          },

          error: () => {
            this.loading = false;
          },
        });
    }
  }

  deleteDraw(drawId: number): void {
    if (!confirm('❌ Supprimer ce tirage ?')) return;

    this.http
      .delete(`${environment.apiBaseUrl}/lists/${this.listId}/draws/${drawId}`)
      .subscribe({
        next: () => {
          this.draws = this.draws.filter((d) => d.id !== drawId);
        },
        error: () => {
          alert('Erreur lors de la suppression');
        },
      });
  }

  refresh(): void {
    this.loading = true;
    this.http
      .get<DrawDto[]>(`${environment.apiBaseUrl}/lists/${this.listId}/draws`)
      .subscribe({
        next: (data) => {
          this.draws = data
            .filter((d): d is DrawDto & { createdAt: string } => !!d.createdAt)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
