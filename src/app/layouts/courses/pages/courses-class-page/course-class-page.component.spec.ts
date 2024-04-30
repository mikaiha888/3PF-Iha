import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClassPageComponent } from './course-class-page.component';

describe('CourseClassPageComponent', () => {
  let component: CourseClassPageComponent;
  let fixture: ComponentFixture<CourseClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseClassPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
