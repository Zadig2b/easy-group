import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parrainage',
  templateUrl: './parrainage.component.html',
  styleUrls: ['./parrainage.component.scss'],
  imports: []
})
export class ParrainageComponent {
  constructor(private router: Router) {}

  goToContact() {
    this.router.navigate(['/contact']);
  }
}
