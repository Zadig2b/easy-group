import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListService } from '../../core/services/list.service';
import { ListDto } from '../../core/models/list.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  lists: ListDto[] = [];
  loading = true;

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getUserLists().subscribe({
      next: (data) => {
        this.lists = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
