import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDrawFormComponent } from './submit-draw-form.component';

describe('SubmitDrawFormComponent', () => {
  let component: SubmitDrawFormComponent;
  let fixture: ComponentFixture<SubmitDrawFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitDrawFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitDrawFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
