import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateListComponent } from './create-list.component';
import { ListService } from '../../../core/services/list.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('CreateListComponent', () => {
  let component: CreateListComponent;
  let fixture: ComponentFixture<CreateListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const listSpy = jasmine.createSpyObj('ListService', ['createList']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CreateListComponent],
      providers: [
        provideHttpClient(),
        { provide: ListService, useValue: listSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateListComponent);
    component = fixture.componentInstance;
    listServiceSpy = TestBed.inject(ListService) as jasmine.SpyObj<ListService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty name', () => {
    const nameControl = component.listForm.get('name');
    expect(nameControl).toBeDefined();
    expect(nameControl?.value).toBe('');
    expect(nameControl?.valid).toBeFalse();
  });

  it('should submit form and navigate to dashboard on success', () => {
    listServiceSpy.createList.and.returnValue(of({}));

    component.listForm.setValue({ name: 'Nouvelle liste' });

    component.onSubmit();

    expect(component.submitting).toBeTrue();
    expect(listServiceSpy.createList).toHaveBeenCalledWith('Nouvelle liste');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not submit if form is invalid', () => {
    component.listForm.setValue({ name: '' }); // invalide
    component.onSubmit();

    expect(listServiceSpy.createList).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should handle error and reset submitting flag', () => {
    listServiceSpy.createList.and.returnValue(throwError(() => new Error('API fail')));
    component.listForm.setValue({ name: 'Erreur' });

    component.onSubmit();

    expect(component.submitting).toBeFalse();
  });
});
