import { Classe } from "./classes.model";
import { Course } from "./course.model";
import { User } from "./user.model";

export interface CourseEnrolled {
  course: Course;
  classe: Classe;
  grade?: number[];
  isApproved: boolean | null;
}

export interface Student extends User{
  courseEnrolled: CourseEnrolled;
}
