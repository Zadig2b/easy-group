import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-apartment-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './apartment-card.component.html',
  styleUrl: './apartment-card.component.scss'
})
export class ApartmentCardComponent {
  @Input() apartment: any;
}
