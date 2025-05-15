import { Component, inject } from '@angular/core';
import { GLOBAL_CONFIG } from '../../config/global.config';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    private config = inject(GLOBAL_CONFIG);

authorName = this.config.author
}
