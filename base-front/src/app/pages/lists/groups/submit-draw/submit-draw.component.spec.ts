import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SubmitDrawComponent } from './submit-draw.component';

describe('SubmitDrawComponent', () => {
  let component: SubmitDrawComponent;
  let fixture: ComponentFixture<SubmitDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitDrawComponent],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
