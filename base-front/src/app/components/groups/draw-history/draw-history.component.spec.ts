import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawHistoryComponent } from './draw-history.component';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DrawDto } from '../../../core/models/draw.dto';
import { environment } from '../../../../environments/environment';

describe('DrawHistoryComponent', () => {
  let component: DrawHistoryComponent;
  let fixture: ComponentFixture<DrawHistoryComponent>;
  let httpMock: HttpTestingController;

  const listId = 'test-list-id';
  const mockDraws: DrawDto[] = [
    {
      id: 1,
      createdAt: '2024-01-01T10:00:00Z',
      title: 'Tirage 1',
      groups: [],
    },
    {
      id: 2,
      createdAt: '2024-01-02T12:00:00Z',
      title: 'Tirage 2',
      groups: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DrawHistoryComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(DrawHistoryComponent);
    component = fixture.componentInstance;
    component.listId = listId;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and sort draws on init', () => {
    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/lists/${listId}/draws`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDraws);

    expect(component.draws.length).toBe(2);
    expect(component.draws[0].id).toBe(2); // sorted by date DESC
    expect(component.loading).toBeFalse();
  });

  it('should delete a draw when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true); // simulate confirmation
    component.draws = [...mockDraws];

    component.deleteDraw(1);

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/lists/${listId}/draws/1`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(component.draws.length).toBe(1);
    expect(component.draws.find((d) => d.id === 1)).toBeUndefined();
  });

  it('should not delete a draw when cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // simulate cancel
    component.draws = [...mockDraws];

    component.deleteDraw(1);

    httpMock.expectNone(`${environment.apiBaseUrl}/lists/${listId}/draws/1`);
    expect(component.draws.length).toBe(2);
  });

  it('should refresh draws', () => {
    component.refresh();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/lists/${listId}/draws`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDraws);

    expect(component.draws.length).toBe(2);
    expect(component.loading).toBeFalse();
  });
});
