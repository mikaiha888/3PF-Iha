import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-course-class-list-page',
  templateUrl: './course-class-list-page.component.html',
  styleUrl: './course-class-list-page.component.scss'
})
export class CourseClassListPageComponent implements OnInit {
  students: Student[] = []
  actualCourse: any;
  course: any;
  classNumber: number;
  loading: boolean = true;
  isSortAZ: boolean = true;
  
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _students: StudentsService) {
    this.actualCourse = this._router.url.split('/')[2];
    console.log(this.actualCourse);
    
    this.course = this.actualCourse.split('-').join(' ') 
    this.course = this.course === 'ux design'
    ? 'UX Design'
    : this.course.replace(/(?:^|\s)\w/g,(match: string) => match.toUpperCase());
    
    this.classNumber = this._activatedRoute.snapshot.params['classNumber']
    this.classNumber = Number(this.classNumber)    
  }

  ngOnInit(): void {
    this._students.getStudentsByClass(this.course, this.classNumber).subscribe({
      next: (students) => {        
        this.students = students;
      },
      error: (error) => console.log(error),
      complete: () => this.loading = false
    });
  }

  sortStudents() {
    this.isSortAZ = !this.isSortAZ;
    this._students.sortStudents(this.isSortAZ, this.students).subscribe({
      next: (sortedStudents) => this.students = [...sortedStudents],
      complete: () => {}
    });
  }

  openDialog() {
    this._students.openDialog().subscribe({
      next: (response) => {
        response.id = this.students[this.students.length - 1].id + 1;
        response.createdAt = new Date();
        this.students = [...this.students, response];       
      },
    });
  }
}
