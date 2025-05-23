import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../core/models/person.model';

@Component({
  selector: 'app-submit-draw-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-draw-form.component.html',
  styleUrls: ['./submit-draw-form.component.scss']
})
export class SubmitDrawFormComponent {
  @Input() persons: Person[] = [];
  @Input() drawForm!: FormGroup;
  @Input() loading = false;
  @Input() message = '';
  @Input() onSubmit: () => void = () => {};
}
