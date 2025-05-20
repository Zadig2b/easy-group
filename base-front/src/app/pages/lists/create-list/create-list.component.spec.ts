import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CreateListComponent } from './create-list.component';
import { ListService } from '../../../core/services/list.service';

describe('CreateListComponent', () => {
  let component: CreateListComponent;
  let fixture: ComponentFixture<CreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateListComponent],
      providers: [
        provideHttpClientTesting(),
        ListService 
      ]    }).compileComponents();

    fixture = TestBed.createComponent(CreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
