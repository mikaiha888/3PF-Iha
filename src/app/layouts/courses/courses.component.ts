import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  course: string;
  isSortAZ: boolean = true;

  constructor(private _activatedRoute: ActivatedRoute, private _courses: CoursesService) {
    this.course = this._activatedRoute.snapshot.params['courseName']
  }

  ngOnInit(): void {
    this._courses.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  updateCourses(editingCourses: Course): void {
    this._courses.updateCourse(editingCourses).subscribe({
      next: (response) => {
        this.courses = this.courses.map((course) => 
          course.id === editingCourses.id 
            ? { ...course, ...response}
            : course
        );
      },
    });
  }

  deleteCourses(id: number): void {
    this._courses.deleteCourse(id).subscribe((courses) => {
      this.courses = courses;
    });
  }

  
  sortCourses() {
    this.isSortAZ = !this.isSortAZ;
    this._courses.sortCourses(this.isSortAZ, this.courses).subscribe({
      next: (sortedCourses) => this.courses = [...sortedCourses],
      complete: () => {}
    });
  }

  addCourse() {
    this._courses.addCourse().subscribe({
      next: (response) => {
        response.id = this.courses[this.courses.length - 1].id + 1;
        response.createdAt = new Date();
        console.log(response);
        this.courses = [...this.courses, response];       
      },
    });
  }
}
