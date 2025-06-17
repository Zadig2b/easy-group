import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './view-list.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListService } from '../../../core/services/list.service';
import { provideHttpClient } from '@angular/common/http';
import { Person } from '../../../core/models/person.model';
import { ListDto } from '../../../core/models/list.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;

  const mockList: ListDto = {
    id: 1,
    name: 'Liste Test',
    personCount: 4,
    drawCount: 2,
  };
const mockPersons: Person[] = [
  {
    id: 1,
    name: 'Alice',
    gender: 'FEMALE',
    age: 25,
    frenchLevel: 3,
    oldDwwm: false,
    techLevel: 2,
    profile: 'A_LAISE',
  },
  {
    id: 2,
    name: 'Bob',
    gender: 'MALE',
    age: 30,
    frenchLevel: 4,
    oldDwwm: true,
    techLevel: 3,
    profile: 'A_LAISE',
  },
];

  beforeEach(async () => {
    const listServiceMock = jasmine.createSpyObj('ListService', [
      'getListById',
      'getListPersons',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideHttpClient(),
        { provide: ListService, useValue: listServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    listServiceSpy = TestBed.inject(ListService) as jasmine.SpyObj<ListService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load list details and persons on init', () => {
    listServiceSpy.getListById.and.returnValue(of(mockList));
    listServiceSpy.getListPersons.and.returnValue(of(mockPersons));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.listName).toBe('Liste Test');
    expect(component.personCount).toBe(4);
    expect(component.persons.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should set error state if getListById fails', () => {
    listServiceSpy.getListById.and.returnValue(
      throwError(() => new Error('fail'))
    );
    listServiceSpy.getListPersons.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.listName).toBe('[Liste inaccessible]');
    expect(component.personCount).toBe(0);
    expect(component.loading).toBeFalse();
  });

  it('should refresh list and persons on refreshList()', () => {
    listServiceSpy.getListById.and.returnValue(of(mockList));
    listServiceSpy.getListPersons.and.returnValue(of(mockPersons));

    component.refreshList();

    expect(component.refreshToken).toBe(1);
    expect(listServiceSpy.getListById).toHaveBeenCalledTimes(1);
    expect(listServiceSpy.getListPersons).toHaveBeenCalledTimes(1);
  });

  it('should call drawHistoryComponent.refresh() on draw submission', () => {
    const refreshSpy = jasmine.createSpy();
    component.drawHistoryComponent = { refresh: refreshSpy } as any;

    listServiceSpy.getListById.and.returnValue(of(mockList));
    listServiceSpy.getListPersons.and.returnValue(of(mockPersons));

    component.onDrawSubmitted();

    expect(refreshSpy).toHaveBeenCalled();
  });
});
