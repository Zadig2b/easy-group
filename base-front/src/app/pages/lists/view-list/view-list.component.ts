import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../persons/person-form/person-form.component';
import { PersonListComponent } from '../persons/person-list/person-list.component';
import { ListService } from '../../../core/services/list.service';
import { SubmitDrawComponent } from '../groups/submit-draw/submit-draw.component';
import { DrawHistoryComponent } from '../groups/draw-history/draw-history.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
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
  generatedGroupsFromFrontend: { name: string; memberIds: number[] }[] = [];

  ngOnInit(): void {
    this.loadListDetails();
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

  refreshList(): void {
    this.refreshToken++;
    this.loadListDetails(); // recharge le nom + nombre de personnes
  }
}
