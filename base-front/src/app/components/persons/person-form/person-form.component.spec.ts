import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let httpMock: HttpTestingController;

  const listId = '123';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    component.listId = listId;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form visibility', () => {
    expect(component.showForm).toBeFalse();
    component.toggleForm();
    expect(component.showForm).toBeTrue();
    component.toggleForm();
    expect(component.showForm).toBeFalse();
  });

  it('should submit form and emit event when valid', () => {
    spyOn(component.personAdded, 'emit');

    component.personForm.setValue({
      name: 'John Doe',
      gender: 'MALE',
      age: 30,
      frenchLevel: 3,
      oldDwwm: false,
      techLevel: 2,
      profile: 'A_LAISE',
    });

    component.submit();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/lists/${listId}/persons`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe('John Doe');

    req.flush({});

    expect(component.message).toContain('✅');
    expect(component.showForm).toBeFalse();
    expect(component.personAdded.emit).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component.personAdded, 'emit');
    component.personForm.controls['name'].setValue(''); // invalide
    component.submit();

    httpMock.expectNone(`${environment.apiBaseUrl}/lists/${listId}/persons`);
    expect(component.personAdded.emit).not.toHaveBeenCalled();
  });
});
