import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../persons/person-form/person-form.component';
import { PersonListComponent } from '../persons/person-list/person-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, PersonFormComponent, PersonListComponent],
  templateUrl: './view-list.component.html',
})
export class ListComponent {
  listId = inject(ActivatedRoute).snapshot.paramMap.get('listId')!;
  refreshToken = 0;

  refreshList(): void {
    this.refreshToken++;
  }
}
