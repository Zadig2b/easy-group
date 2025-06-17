import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitDrawComponent } from './submit-draw.component';
import { DrawService } from '../../../core/services/draw.service';
import { GroupGeneratorService } from '../../../core/services/group-generator.service';
import { of, throwError } from 'rxjs';
import { Person } from '../../../core/models/person.model';
import { DrawDto } from '../../../core/models/draw.dto';

describe('SubmitDrawComponent', () => {
  let component: SubmitDrawComponent;
  let fixture: ComponentFixture<SubmitDrawComponent>;
  let drawServiceSpy: jasmine.SpyObj<DrawService>;
  let groupGeneratorSpy: jasmine.SpyObj<GroupGeneratorService>;

  const mockPersons: Person[] = [
    {
      id: 1,
      name: 'Alice',
      gender: 'FEMALE',
      age: 25,
      frenchLevel: 3,
      techLevel: 2,
      oldDwwm: false,
      profile: 'A_LAISE',
    },
    {
      id: 2,
      name: 'Bob',
      gender: 'MALE',
      age: 30,
      frenchLevel: 4,
      techLevel: 3,
      oldDwwm: true,
      profile: 'A_LAISE',
    },
  ];

  beforeEach(async () => {
    const drawSpy = jasmine.createSpyObj('DrawService', ['submitDraw']);
    const groupGenSpy = jasmine.createSpyObj('GroupGeneratorService', [
      'generateGroups',
    ]);

    await TestBed.configureTestingModule({
      imports: [SubmitDrawComponent],
      providers: [
        { provide: DrawService, useValue: drawSpy },
        { provide: GroupGeneratorService, useValue: groupGenSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitDrawComponent);
    component = fixture.componentInstance;
    drawServiceSpy = TestBed.inject(DrawService) as jasmine.SpyObj<DrawService>;
    groupGeneratorSpy = TestBed.inject(
      GroupGeneratorService
    ) as jasmine.SpyObj<GroupGeneratorService>;

    component.listId = '1';
    component.persons = mockPersons;
    component.refreshList = () => {};
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.drawForm).toBeDefined();
    expect(component.drawForm.controls['drawTitle']).toBeDefined();
    expect(component.drawForm.controls['groupCount'].value).toBe(2);
  });

  it('should update groupCount validator on ngOnChanges', () => {
    component.drawForm.get('groupCount')?.setValue(5); // initially invalid
    component.ngOnChanges({
      persons: {
        currentValue: mockPersons,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    const control = component.drawForm.get('groupCount');
    control?.updateValueAndValidity();
    expect(control?.errors?.['max']).toBeTruthy(); // > 2 persons
  });

  it('should submit draw and emit event', () => {
    spyOn(component.drawSubmitted, 'emit');
    groupGeneratorSpy.generateGroups.and.returnValue([
      {
        name: 'Group 1',
        memberIds: [1, 2],
        memberNames: ['Alice', 'Bob'],
      },
    ]);

    drawServiceSpy.submitDraw.and.returnValue(of(void 0));

    component.drawForm.setValue({
      drawTitle: 'Tirage test',
      groupCount: 2,
    });

    component.generateAndSubmitGroups();

    expect(groupGeneratorSpy.generateGroups).toHaveBeenCalledWith(
      mockPersons,
      2
    );
    expect(drawServiceSpy.submitDraw).toHaveBeenCalledWith(
      '1',
      jasmine.any(Object)
    );
    expect(component.message).toContain('🎉');
    expect(component.loading).toBeFalse();
    expect(component.drawSubmitted.emit).toHaveBeenCalled();
  });

  it('should show error message on submit failure', () => {
    drawServiceSpy.submitDraw.and.returnValue(
      throwError(() => new Error('fail'))
    );
    groupGeneratorSpy.generateGroups.and.returnValue([]);

    component.drawForm.setValue({
      drawTitle: 'Erreur',
      groupCount: 2,
    });

    component.generateAndSubmitGroups();

    expect(component.message).toContain('❌');
    expect(component.loading).toBeFalse();
  });

  it('should not submit if form is invalid', () => {
    component.drawForm.setValue({
      drawTitle: '',
      groupCount: 0,
    });

    component.generateAndSubmitGroups();

    expect(drawServiceSpy.submitDraw).not.toHaveBeenCalled();
    expect(component.message).toContain('Veuillez remplir');
  });
});
