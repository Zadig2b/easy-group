import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PersonFormComponent } from './person-form.component';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormComponent], // 👈 standalone
      providers: [provideHttpClientTesting()] // ✅ fournit HttpClient
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
