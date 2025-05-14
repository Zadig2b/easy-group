import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PforchildComponent } from './pforchild.component';

describe('PforchildComponent', () => {
  let component: PforchildComponent;
  let fixture: ComponentFixture<PforchildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PforchildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PforchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
