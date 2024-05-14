import { User } from "./user.model";


export interface CoursesTeaching {
    courseId: number;
    classeId: number;
  }

export interface Admin extends User{
    coursesTeaching: CoursesTeaching[];
}