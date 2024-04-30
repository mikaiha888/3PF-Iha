import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClassListPageComponent } from './course-class-list-page.component';

describe('CourseClassListPageComponent', () => {
  let component: CourseClassListPageComponent;
  let fixture: ComponentFixture<CourseClassListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseClassListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseClassListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
