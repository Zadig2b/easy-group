import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Person } from '../../../../core/models/person.model';
import { generateGroups } from '../../../../utils/group-generator';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { DrawDto } from '../../../../core/models/draw.dto';

@Component({
  selector: 'app-submit-draw',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-draw.component.html',
  styleUrl: './submit-draw.component.scss',
})
export class SubmitDrawComponent implements OnInit {
  @Input() listId!: string;
  @Input() persons: Person[] = [];
  @Input() refreshList: () => void = () => {};
  @Output() drawSubmitted = new EventEmitter<void>();

  message = '';
  loading = false;

  drawForm!: FormGroup;

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.drawForm = new FormGroup({
    drawTitle: new FormControl('', Validators.required),
    groupCount: new FormControl(2, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}


  generateAndSubmitGroups() {
    if (this.drawForm.invalid) {
      this.message = 'Veuillez remplir correctement le formulaire.';
      this.drawForm.markAllAsTouched();
      return;
    }

    const { drawTitle, groupCount } = this.drawForm.value;

    const drawDto: DrawDto = {
      title: drawTitle.trim() || null,
      groups: generateGroups(this.persons, groupCount),
    };

    this.loading = true;
    this.http
      .post(`${environment.apiBaseUrl}/lists/${this.listId}/draws`, drawDto)
      .subscribe({
        next: () => {
          this.message = '🎉 Tirage enregistré avec succès !';
          this.drawSubmitted.emit();
          this.drawForm.reset({ drawTitle: '', groupCount: 2 });
          this.loading = false;
        },
        error: () => {
          this.message = "❌ Une erreur est survenue lors de l'enregistrement.";
          this.loading = false;
        },
      });
  }
}
