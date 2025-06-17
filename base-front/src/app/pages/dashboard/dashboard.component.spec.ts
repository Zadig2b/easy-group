import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListService } from '../../core/services/list.service';
import { ListDto } from '../../core/models/list.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;

  const mockLists: ListDto[] = [
    { id: 1, name: 'Liste 1', personCount: 3, drawCount: 2 },
    { id: 2, name: 'Liste 2', personCount: 5, drawCount: 1 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ListService', [
      'getUserLists',
      'deleteList',
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([]), { provide: ListService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    listServiceSpy = TestBed.inject(ListService) as jasmine.SpyObj<ListService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load lists on init', () => {
    listServiceSpy.getUserLists.and.returnValue(of(mockLists));
    fixture.detectChanges();

    expect(listServiceSpy.getUserLists).toHaveBeenCalled();
    expect(component.lists.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should set error on getUserLists failure', () => {
    listServiceSpy.getUserLists.and.returnValue(
      throwError(() => new Error('fail'))
    );
    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should delete a list after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.lists = [...mockLists];

    listServiceSpy.deleteList.and.returnValue(of(void 0));
    component.deleteList(1);

    expect(listServiceSpy.deleteList).toHaveBeenCalledWith(1);
    expect(component.lists.find((l) => l.id === 1)).toBeUndefined();
  });

  it('should not delete a list if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.lists = [...mockLists];

    component.deleteList(1);

    expect(listServiceSpy.deleteList).not.toHaveBeenCalled();
    expect(component.lists.length).toBe(2);
  });
});
