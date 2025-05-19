import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../persons/person-form/person-form.component';
import { PersonListComponent } from '../persons/person-list/person-list.component';
import { SubmitDrawComponent } from '../groups/submit-draw/submit-draw.component';
import { DrawHistoryComponent } from '../groups/draw-history/draw-history.component';
import { ListService } from '../../../core/services/list.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Person } from '../../../core/models/person.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PersonFormComponent,
    PersonListComponent,
    SubmitDrawComponent,
    DrawHistoryComponent,
  ],
  templateUrl: './view-list.component.html',
})
export class ListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private listService = inject(ListService);
  private http = inject(HttpClient);

  listId = this.route.snapshot.paramMap.get('listId')!;
  listName = '';
  personCount = 0;
  refreshToken = 0;
  loading = true;
  error = false;

  persons: Person[] = [];
  generatedGroupsFromFrontend: { name: string; memberIds: number[] }[] = [];
  groupCount = 2;
  // 👉 Référence au composant enfant DrawHistoryComponent
  @ViewChild(DrawHistoryComponent) drawHistoryComponent!: DrawHistoryComponent;
  ngOnInit(): void {
    this.loadListDetails();
    this.loadPersons();
  }

  onPersonDeleted(newCount: number): void {
    this.personCount = newCount;
  }

  loadListDetails(): void {
    this.loading = true;
    this.listService.getListById(+this.listId).subscribe({
      next: (data) => {
        this.listName = data.name;
        this.personCount = data.personCount;
        this.loading = false;
        this.error = false;
      },
      error: (err) => {
        console.error('Erreur de chargement de la liste', err);
        this.listName = '[Liste inaccessible]';
        this.personCount = 0;
        this.loading = false;
        this.error = true;
      },
    });
  }

  loadPersons(): void {
    this.http
      .get<Person[]>(`http://localhost:8080/api/lists/${this.listId}/persons`)
      .subscribe({
        next: (data) => (this.persons = data),
        error: () => console.error('Erreur chargement des personnes'),
      });
  }

  refreshList(): void {
    this.refreshToken++;
    this.loadListDetails();
    this.loadPersons();
  }

  // 👉 Appelé après la soumission d'un tirage
  onDrawSubmitted(): void {
    this.refreshList();
    if (this.drawHistoryComponent) {
      this.drawHistoryComponent.refresh();
    }
  }
}
