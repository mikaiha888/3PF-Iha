import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListHeaderComponent } from './student-list-header.component';

describe('StudentListHeaderComponent', () => {
  let component: StudentListHeaderComponent;
  let fixture: ComponentFixture<StudentListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentListHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
