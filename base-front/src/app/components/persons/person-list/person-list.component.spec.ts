import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { environment } from '../../../../environments/environment';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let httpMock: HttpTestingController;

  const listId = '123';
  const mockPersons = [
    {
      id: 1,
      name: 'Alice',
      gender: 'FEMALE',
      profile: 'TIMIDE',
      frenchLevel: 3,
      techLevel: 2,
      oldDwwm: true,
    },
    {
      id: 2,
      name: 'Bob',
      gender: 'MALE',
      profile: 'A_LAISE',
      frenchLevel: 2,
      techLevel: 1,
      oldDwwm: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    component.listId = listId;
    component.refreshToken = 0;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load persons on ngOnChanges', () => {
    component.ngOnChanges({
      listId: new SimpleChange(null, listId, true)
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/lists/${listId}/persons`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPersons);

    expect(component.persons.length).toBe(2);
    expect(component.persons[0].genderLabel).toBe('Femme');
    expect(component.persons[0].profileLabel).toBe('Timide');
    expect(component.persons[1].genderLabel).toBe('Homme');
    expect(component.loading).toBeFalse();
  });

  it('should delete person and emit updated count', () => {
    spyOn(component.personDeleted, 'emit');
    component.persons = mockPersons.map(p => component['mapPersonToDisplay'](p)); // simulate loaded state

    component.deletePerson(1);

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/lists/${listId}/persons/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(component.persons.length).toBe(1);
    expect(component.personDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should not call API if no listId is set', () => {
    component.listId = '';
    component.loadPersons();
    httpMock.expectNone(`${environment.apiBaseUrl}/lists//persons`);
  });
});
