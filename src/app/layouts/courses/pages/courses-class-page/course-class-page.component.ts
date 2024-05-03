import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/models';

@Component({
  selector: 'app-courses-class-page',
  templateUrl: './course-class-page.component.html',
  styleUrl: './course-class-page.component.scss',
})
export class CourseClassPageComponent implements OnInit {
  // courses: Course[] = [];
  // classes: number[] = [];
  // course: string;

  // constructor(private _activatedRoute: ActivatedRoute, private _courses: CoursesService) {
  //   this.course = this._activatedRoute.snapshot.params['courseName'].split('-').join(' ')
  //   this.course = this.course === 'ux design'
  //   ? 'UX Design'
  //   : this.course.replace(/(?:^|\s)\w/g,(match: string) => match.toUpperCase())
  // }

  ngOnInit(): void {
    // this._courses.getCourses().subscribe({
    //   next: (courses) => {
    //     this.courses = courses;
    //     const actualCourse = courses.find(course => course.courseName === this.course) 
    //     this.classes = actualCourse ? [...actualCourse.classes] : []
    //   }
    // })
  }
}
