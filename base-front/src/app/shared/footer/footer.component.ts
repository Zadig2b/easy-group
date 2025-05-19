import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GLOBAL_CONFIG } from '../../config/global.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule], // nécessaire pour *ngIf, routerLink, etc.
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private config = inject(GLOBAL_CONFIG);
  authorName = this.config.author;
  authorLink = this.config.authorlink;
}
