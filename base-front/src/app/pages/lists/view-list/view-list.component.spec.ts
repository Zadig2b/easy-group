import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './view-list.component'; // fichier = view-list, classe = ListComponent
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, provideHttpClientTesting],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 123, // ✅ retourne un number si listId est typé ainsi
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // ignore les composants enfants
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
  });

  it('should display list name and person count when loaded', () => {
    component.loading = false;
    component.error = false;
    component.listName = 'Promo CDA';
    component.personCount = 5;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('h2');
    const countText = fixture.nativeElement.querySelector('p');

    expect(title.textContent).toContain('Promo CDA');
    expect(countText.textContent).toContain('5 personne');
  });

  it('should show error alert if error is true and loading is false', () => {
    component.loading = false;
    component.error = true;
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert-danger');
    expect(alert).toBeTruthy();
  });

  it('should update refreshToken on personDeleted', () => {
    const oldToken = component.refreshToken;
    component.onPersonDeleted(1);
    expect(component.refreshToken).not.toBe(oldToken);
  });

  it('should call refreshList on personAdded event', () => {
    spyOn(component, 'refreshList');
    component.refreshList(); // simulate event
    expect(component.refreshList).toHaveBeenCalled();
  });

  it('should reload draw history on drawSubmitted', () => {
    (component as any).drawHistory = {
      reloadHistory: jasmine.createSpy('reloadHistory'),
    };
    component.onDrawSubmitted();
    expect((component as any).drawHistory.reloadHistory).toHaveBeenCalled();
  });
});
