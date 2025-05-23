import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../../core/models/person.model';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DrawDto } from '../../../core/models/draw.dto';
import { SimpleChanges } from '@angular/core';
import { SubmitDrawFormComponent } from '../submit-draw-form/submit-draw-form.component';
import { DrawService } from '../../../core/services/draw.service';
import { GroupGeneratorService } from '../../../core/services/group-generator.service';
@Component({
  selector: 'app-submit-draw',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubmitDrawFormComponent],
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

  constructor(
    private drawService: DrawService,
    private groupGeneratorService: GroupGeneratorService
  ) {}

  ngOnInit(): void {
    this.drawForm = new FormGroup({
      drawTitle: new FormControl('', Validators.required),
      groupCount: new FormControl(2, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['persons'] && this.drawForm) {
      const groupCount = this.drawForm.get('groupCount');
      groupCount?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.persons.length),
      ]);
      groupCount?.updateValueAndValidity();
    }
  }
  generateAndSubmitGroups(): void {
    if (this.drawForm.invalid) {
      this.message = 'Veuillez remplir correctement le formulaire.';
      this.drawForm.markAllAsTouched();
      return;
    }

    const { drawTitle, groupCount } = this.drawForm.value;

    const drawDto: DrawDto = {
      title: drawTitle.trim() || null,
      groups: this.groupGeneratorService.generateGroups(
        this.persons,
        groupCount
      ),
    };

    this.loading = true;

    this.drawService.submitDraw(this.listId, drawDto).subscribe({
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
