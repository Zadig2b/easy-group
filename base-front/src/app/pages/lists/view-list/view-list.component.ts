import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../../../components/persons/person-form/person-form.component';
import { PersonListComponent } from '../../../components/persons/person-list/person-list.component';
import { SubmitDrawComponent } from '../../../components/groups/submit-draw/submit-draw.component';
import { DrawHistoryComponent } from '../../../components/groups/draw-history/draw-history.component';
import { ListService } from '../../../core/services/list.service';
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

  listId = this.route.snapshot.paramMap.get('listId')!;
  listName = '';
  personCount = 0;
  refreshToken = 0;
  loading = true;
  error = false;

  persons: Person[] = [];
  generatedGroupsFromFrontend: { name: string; memberIds: number[] }[] = [];
  groupCount = 2;

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
    this.listService.getListPersons(+this.listId).subscribe(data => {
      this.persons = data;
    });
  }

  refreshList(): void {
    this.refreshToken++;
    this.loadListDetails();
    this.loadPersons();
  }

  onDrawSubmitted(): void {
    this.refreshList();
    if (this.drawHistoryComponent) {
      this.drawHistoryComponent.refresh();
    }
  }
}
